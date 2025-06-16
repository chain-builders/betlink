// app/leaderboard/page.tsx
import React from "react";

type User = {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  totalWins: number;
  totalBets: number;
  winRate: number;
  earnings: string;
  isCurrentUser?: boolean;
};

const LeaderboardPage = () => {
  const users: User[] = [
    {
      id: "1",
      rank: 1,
      name: "BetMaster99",
      avatar: "👑",
      totalWins: 42,
      totalBets: 58,
      winRate: 72.4,
      earnings: "$12,450",
    },
    {
      id: "2",
      rank: 2,
      name: "LuckyStrike",
      avatar: "🍀",
      totalWins: 38,
      totalBets: 65,
      winRate: 58.5,
      earnings: "$9,870",
    },
    {
      id: "3",
      rank: 3,
      name: "PredictorX",
      avatar: "🔮",
      totalWins: 35,
      totalBets: 72,
      winRate: 48.6,
      earnings: "$8,125",
    },
    {
      id: "4",
      rank: 4,
      name: "GoldenBets",
      avatar: "💰",
      totalWins: 31,
      totalBets: 80,
      winRate: 38.8,
      earnings: "$6,430",
    },
    {
      id: "5",
      rank: 5,
      name: "SafePlayer",
      avatar: "🛡️",
      totalWins: 28,
      totalBets: 45,
      winRate: 62.2,
      earnings: "$5,980",
    },
    {
      id: "6",
      rank: 6,
      name: "RiskTaker",
      avatar: "🎲",
      totalWins: 25,
      totalBets: 120,
      winRate: 20.8,
      earnings: "$5,210",
    },
    {
      id: "7",
      rank: 7,
      name: "You", // Current user
      avatar: "😎",
      totalWins: 22,
      totalBets: 50,
      winRate: 44.0,
      earnings: "$4,350",
      isCurrentUser: true,
    },
    {
      id: "8",
      rank: 8,
      name: "SoccerPro",
      avatar: "⚽",
      totalWins: 20,
      totalBets: 65,
      winRate: 30.8,
      earnings: "$3,890",
    },
    {
      id: "9",
      rank: 9,
      name: "LateBettor",
      avatar: "⏰",
      totalWins: 18,
      totalBets: 70,
      winRate: 25.7,
      earnings: "$3,210",
    },
    {
      id: "10",
      rank: 10,
      name: "NewComer",
      avatar: "🆕",
      totalWins: 15,
      totalBets: 30,
      winRate: 50.0,
      earnings: "$2,850",
    },
  ];

  const timePeriods = ["Daily", "Weekly", "Monthly", "All Time"];

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="pt-6 pb-4 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">BetLink Leaderboard</h1>
          <p className="text-[#c13ae3] font-medium">Top predictors this week</p>
        </div>
      </header>

      {/* Time Period Selector */}
      <div className="container mx-auto px-4 py-2 flex space-x-2 overflow-x-auto">
        {timePeriods.map((period) => (
          <button
            key={period}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              period === "Weekly"
                ? "bg-[#a716be] text-white"
                : "bg-white/10 text-white/80"
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Top 3 Podium */}
        <div className="flex justify-center items-end space-x-2 mb-8">
          {/* Second Place */}
          <div className="flex flex-col items-center w-1/4">
            <div className="bg-gradient-to-b from-[#c0c0c0] to-[#808080] h-32 w-full rounded-t-lg flex items-center justify-center">
              <span className="text-4xl">2</span>
            </div>
            <div className="bg-white text-[#120555] p-2 w-full rounded-b-lg text-center">
              <p className="font-bold">LuckyStrike</p>
              <p className="text-sm">$9,870</p>
            </div>
          </div>

          {/* First Place */}
          <div className="flex flex-col items-center w-1/3">
            <div className="bg-gradient-to-b from-[#ffd700] to-[#daa520] h-40 w-full rounded-t-lg flex items-center justify-center">
              <span className="text-4xl">1</span>
            </div>
            <div className="bg-white text-[#120555] p-2 w-full rounded-b-lg text-center">
              <p className="font-bold">BetMaster99</p>
              <p className="text-sm">$12,450</p>
            </div>
          </div>

          {/* Third Place */}
          <div className="flex flex-col items-center w-1/4">
            <div className="bg-gradient-to-b from-[#cd7f32] to-[#a0522d] h-24 w-full rounded-t-lg flex items-center justify-center">
              <span className="text-4xl">3</span>
            </div>
            <div className="bg-white text-[#120555] p-2 w-full rounded-b-lg text-center">
              <p className="font-bold">PredictorX</p>
              <p className="text-sm">$8,125</p>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 p-4 bg-white/20 font-bold text-sm">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2 text-center">Win Rate</div>
            <div className="col-span-3 text-center">Bets</div>
            <div className="col-span-2 text-right">Earnings</div>
          </div>

          {/* User Rows */}
          {users.map((user) => (
            <div
              key={user.id}
              className={`grid grid-cols-12 gap-2 p-4 items-center border-b border-white/10 ${
                user.isCurrentUser ? "bg-[#a716be]/30" : ""
              }`}
            >
              <div className="col-span-1 font-bold">{user.rank}</div>
              <div className="col-span-4 flex items-center space-x-2">
                <span className="text-xl">{user.avatar}</span>
                <span className={`${user.isCurrentUser ? "font-bold" : ""}`}>
                  {user.name}
                </span>
              </div>
              <div className="col-span-2 text-center">
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div
                    className="bg-[#5b21b6] h-2.5 rounded-full"
                    style={{ width: `${user.winRate}%` }}
                  ></div>
                </div>
                <span className="text-xs">{user.winRate}%</span>
              </div>
              <div className="col-span-3 text-center">
                {user.totalWins}W / {user.totalBets}B
              </div>
              <div className="col-span-2 text-right font-bold">
                {user.earnings}
              </div>
            </div>
          ))}
        </div>

        {/* Current User Stats */}
        <div className="mt-6 p-4 bg-[#120555] rounded-lg">
          <h3 className="font-bold mb-2">Your Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-white/80">Rank</p>
              <p className="text-xl font-bold">7</p>
            </div>
            <div>
              <p className="text-sm text-white/80">Win Rate</p>
              <p className="text-xl font-bold">44%</p>
            </div>
            <div>
              <p className="text-sm text-white/80">Earnings</p>
              <p className="text-xl font-bold">$4,350</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
