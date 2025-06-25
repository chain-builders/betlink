// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// import "chainlink/contracts/src/v0.8/FunctionsClient.sol";

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import "lib/chainlink/contracts/src/v0.8/automation/KeeperCompatible.sol";
import "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract PoolBetting is
    FunctionsClient,
    KeeperCompatibleInterface,
    Ownable,
    ReentrancyGuard
{
    using Functions for Functions.Request;

    enum MatchResult {
        Pending,
        HomeWin,
        AwayWin,
        Draw
    }
    enum BetOutcome {
        HomeWin,
        AwayWin,
        Draw
    }

    struct BettingPool {
        uint256 matchId;
        uint256 deadline;
        uint256 resolutionTime;
        uint256 totalPool;
        uint256 homePool;
        uint256 awayPool;
        uint256 drawPool;
        MatchResult result;
        bool resolved;
    }

    // Betting pools by match ID
    mapping(uint256 => BettingPool) public pools;

    // Individual bets: matchId => bettor => outcome => amount
    mapping(uint256 => mapping(address => mapping(BetOutcome => uint256)))
        public bets;

    // Withdrawal tracking: matchId => bettor => claimed
    mapping(uint256 => mapping(address => bool)) public claimed;

    // Chainlink configuration
    bytes32 private donId;
    uint64 private subscriptionId;
    uint32 private gasLimit;
    IERC20 public immutable i_linkToken;

    // Constants
    uint256 public constant MIN_BET_DURATION = 4 hours;
    uint256 public constant RESOLUTION_DELAY = 2 hours;
    uint256 public constant FEE_BASIS_POINTS = 300; // 3%

    // Events
    event PoolCreated(uint256 indexed matchId, uint256 deadline);
    event BetPlaced(
        uint256 indexed matchId,
        address indexed bettor,
        BetOutcome outcome,
        uint256 amount
    );
    event PoolResolved(uint256 indexed matchId, MatchResult result);
    event WinningsClaimed(
        uint256 indexed matchId,
        address indexed claimer,
        uint256 amount
    );
    event DrawRefunded(
        uint256 indexed matchId,
        address indexed bettor,
        uint256 amount
    );

    constructor(
        address _functionsRouter,
        bytes32 _donId,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        address _linkTokenAddress
    ) FunctionsClient(_functionsRouter) Ownable(msg.sender) {
        donId = _donId;
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
        i_linkToken = LinkTokenInterface(_linkTokenAddress);
    }

    /// @notice Creates a new betting pool for a match
    /// @param matchId The ID of the match
    /// @param duration How long betting will be open (must be >= 4 hours)
    function createPool(uint256 matchId, uint256 duration) external onlyOwner {
        require(pools[matchId].deadline == 0, "Pool already exists");
        require(duration >= MIN_BET_DURATION, "Duration too short");

        pools[matchId] = BettingPool({
            matchId: matchId,
            deadline: block.timestamp + duration,
            resolutionTime: block.timestamp + duration + RESOLUTION_DELAY,
            totalPool: 0,
            homePool: 0,
            awayPool: 0,
            drawPool: 0,
            result: MatchResult.Pending,
            resolved: false
        });

        emit PoolCreated(matchId, block.timestamp + duration);
    }

    /// @notice Places a bet on a specific outcome
    /// @param matchId The ID of the match to bet on
    /// @param outcome The outcome to bet on (0 = HomeWin, 1 = AwayWin, 2 = Draw)
    function placeBet(
        uint256 matchId,
        BetOutcome outcome
    ) external payable nonReentrant {
        BettingPool storage pool = pools[matchId];

        require(pool.deadline > 0, "Pool does not exist");
        require(block.timestamp < pool.deadline, "Betting closed");
        require(msg.value > 0, "Bet amount must be >0");

        // Update pool totals
        pool.totalPool += msg.value;

        if (outcome == BetOutcome.HomeWin) {
            pool.homePool += msg.value;
        } else if (outcome == BetOutcome.AwayWin) {
            pool.awayPool += msg.value;
        } else {
            pool.drawPool += msg.value;
        }

        // Update individual bet tracking
        bets[matchId][msg.sender][outcome] += msg.value;

        emit BetPlaced(matchId, msg.sender, outcome, msg.value);
    }

    /// @notice Chainlink Automation: Checks if resolution is needed
    function checkUpkeep(
        bytes calldata
    ) external view returns (bool upkeepNeeded, bytes memory performData) {
        for (uint256 matchId = 0; matchId < type(uint256).max; matchId++) {
            BettingPool memory pool = pools[matchId];

            if (pool.deadline == 0) break; // No more pools

            if (!pool.resolved && block.timestamp >= pool.resolutionTime) {
                return (true, abi.encode(matchId));
            }
        }
        return (false, "");
    }

    /// @notice Chainlink Automation: Initiates result resolution
    function performUpkeep(bytes calldata performData) external override {
        uint256 matchId = abi.decode(performData, (uint256));
        BettingPool storage pool = pools[matchId];

        require(!pool.resolved, "Already resolved");
        require(
            block.timestamp >= pool.resolutionTime,
            "Resolution time not reached"
        );

        _requestResult(matchId);
    }

    /// @notice Initiates Chainlink Functions request for match result
    function _requestResult(uint256 matchId) private {
        // Check subscription LINK balance
        (uint96 balance, , , ) = i_functionsRouter.getSubscription(
            subscriptionId
        );
        require(balance > 0, "Insufficient LINK in subscription");

        Functions.Request memory req;
        req.initializeRequestForInlineJavaScript(
            "const matchId = args[0];"
            "const apiResponse = await Functions.makeHttpRequest({"
            "url: `https://api.sportsdata.io/v3/soccer/scores/json/Match/${matchId}`,"
            "headers: {"
            '\\"Ocp-Apim-Subscription-Key\\": secrets.API_KEY,'
            '\\"Content-Type\\": \\"application/json\\"'
            "}"
            "});"
            "let result;"
            "if (apiResponse.data.HomeTeamScore === apiResponse.data.AwayTeamScore) {"
            'result = \\"Draw\\";'
            "} else if (apiResponse.data.HomeTeamScore > apiResponse.data.AwayTeamScore) {"
            'result = \\"HomeWin\\";'
            "} else {"
            'result = \\"AwayWin\\";'
            "}"
            "return Functions.encodeString(result);"
        );

        req.addRemoteSecrets([bytes("API_KEY")]);
        req.addArgs([bytes(Strings.toString(matchId))]);

        bytes32 requestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donId
        );

        // Store request ID to match mapping
        pools[matchId].result = MatchResult.Pending;
    }

    /// @notice Chainlink callback for match result
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        uint256 matchId = extractMatchId(requestId); // Implementation needed
        BettingPool storage pool = pools[matchId];

        require(!pool.resolved, "Already resolved");

        if (err.length > 0) {
            // Handle error - retry logic or manual resolution
            return;
        }

        string memory resultStr = string(response);

        if (keccak256(bytes(resultStr)) == keccak256(bytes("HomeWin"))) {
            pool.result = MatchResult.HomeWin;
        } else if (keccak256(bytes(resultStr)) == keccak256(bytes("AwayWin"))) {
            pool.result = MatchResult.AwayWin;
        } else {
            pool.result = MatchResult.Draw;
        }

        pool.resolved = true;
        emit PoolResolved(matchId, pool.result);
    }

    /// @notice Allows users to claim winnings or refunds
    /// @param matchId The ID of the match to claim from
    function claimWinnings(uint256 matchId) external nonReentrant {
        BettingPool storage pool = pools[matchId];
        require(pool.resolved, "Pool not resolved");
        require(!claimed[matchId][msg.sender], "Already claimed");

        claimed[matchId][msg.sender] = true;
        uint256 amount = 0;

        if (pool.result == MatchResult.Draw) {
            // Refund all bets regardless of outcome
            amount =
                bets[matchId][msg.sender][BetOutcome.HomeWin] +
                bets[matchId][msg.sender][BetOutcome.AwayWin] +
                bets[matchId][msg.sender][BetOutcome.Draw];

            if (amount > 0) {
                (bool success, ) = msg.sender.call{value: amount}("");
                require(success, "Refund failed");
                emit DrawRefunded(matchId, msg.sender, amount);
            }
            return;
        }

        // Determine winning outcome
        BetOutcome winningOutcome = (pool.result == MatchResult.HomeWin)
            ? BetOutcome.HomeWin
            : BetOutcome.AwayWin;

        uint256 userBet = bets[matchId][msg.sender][winningOutcome];
        if (userBet == 0) return; // No winning bet

        uint256 winningPool = (winningOutcome == BetOutcome.HomeWin)
            ? pool.homePool
            : pool.awayPool;

        // Calculate winnings proportion
        uint256 totalMinusFee = pool.totalPool -
            ((pool.totalPool * FEE_BASIS_POINTS) / 10000);
        amount = (userBet * totalMinusFee) / winningPool;

        // Distribute winnings
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Payout failed");
        emit WinningsClaimed(matchId, msg.sender, amount);
    }

    /// @notice Allows owner to collect platform fees
    function collectFees() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Fee collection failed");
    }

    /// @notice Emergency manual resolution
    /// @param matchId The ID of the match to resolve
    /// @param result The result to set (1 = HomeWin, 2 = AwayWin, 3 = Draw)
    function manualResolve(
        uint256 matchId,
        MatchResult result
    ) external onlyOwner {
        BettingPool storage pool = pools[matchId];
        require(!pool.resolved, "Already resolved");
        require(block.timestamp > pool.deadline, "Betting still open");

        pool.result = result;
        pool.resolved = true;
        emit PoolResolved(matchId, result);
    }

    // Additional helper functions would be needed for:
    // - extractMatchId()
    // - View functions to get pool information
    // - View functions to get user bet amounts
}
