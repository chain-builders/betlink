import Link from "next/link";

export default function PlayGuides() {
  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">BetLink</h1>
        <p className="text-xl text-center text-[#c13ae3] font-semibold">
          Link Up. Bet Smart. Win Big!
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#a817bc] border-b-2 border-[#a716be] pb-2">
            Play Guides
          </h2>

          {/* How It Works Section */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-[#120555]/70 p-6 rounded-lg border-l-4 border-[#a817bc]">
              <h3 className="text-2xl font-bold mb-3 text-[#c13ae3]">
                Step 1: Create a Bet
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-bold">Pick any upcoming game</span>{" "}
                  (football, basketball, esports, etc.)
                </li>
                <li>
                  <span className="font-bold">Predict an outcome</span> (e.g.,
                  "Team A wins 2-1" or "Player X scores first")
                </li>
                <li>
                  <span className="font-bold">Set your stake</span> (the amount
                  you're willing to bet)
                </li>
                <li>
                  <span className="font-bold">Launch your bet</span> and let
                  others join!
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-[#120555]/70 p-6 rounded-lg border-l-4 border-[#a716be]">
              <h3 className="text-2xl font-bold mb-3 text-[#c13ae3]">
                Step 2: Stake on Existing Bets
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-bold">
                    Browse live or upcoming bets
                  </span>{" "}
                  from other players
                </li>
                <li>
                  <span className="font-bold">Choose a side</span> (agree or
                  disagree with the prediction)
                </li>
                <li>
                  <span className="font-bold">Place your stake</span> to back
                  your pick
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-[#120555]/70 p-6 rounded-lg border-l-4 border-[#5b21b6]">
              <h3 className="text-2xl font-bold mb-3 text-[#c13ae3]">
                Step 3: Win Your Share
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-bold">
                    If your prediction is correct
                  </span>
                  , you'll win a portion of the total pot based on your stake
                </li>
                <li>
                  <span className="font-bold">Example:</span> Bet $10 on a
                  $1,000 pot? Win $100 if you're right!
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why BetLink Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#a817bc]">
            Why BetLink?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#a716be]/20 p-4 rounded-lg border border-[#c13ae3]">
              <p className="font-bold">✅ Simple rules, big rewards</p>
            </div>
            <div className="bg-[#a716be]/20 p-4 rounded-lg border border-[#c13ae3]">
              <p className="font-bold">✅ Bet on any game, any scenario</p>
            </div>
            <div className="bg-[#a716be]/20 p-4 rounded-lg border border-[#c13ae3]">
              <p className="font-bold">✅ Compete with players worldwide</p>
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link
            href="/create-bet"
            className="bg-gradient-to-r from-[#a817bc] to-[#5b21b6] text-white font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition-opacity"
          >
            Start Betting Now
          </Link>
        </div>
      </main>
    </div>
  );
}
