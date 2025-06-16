import { Trophy } from 'lucide-react';

const MatchPage = ({ params }: { params: { slug: string } }) => {
  // Extract teams from slug (example: "real-madrid-vs-liverpool")
  const teams = params.slug.split('-vs-').map(team => team.split('-').join(' '));
  const matchTitle = `${teams[0]} vs ${teams[1]}`;

  // Sample match data - in a real app this would come from an API
  const matchDetails = {
    status: "LIVE",
    score: "2-1",
    summary: "Real Madrid edges 2-1; VAR cancels Liverpool's late goal.",
    players: 300,
    jackpot: "$2,250",
    league: "Champions League",
    date: "Today, 8:45 PM",
    venue: "Santiago Bernabéu",
    possibilities: Array(20).fill(null).map((_, i) => ({
      id: i + 1,
      title: [
        "Real Madrid to win by exactly 1 goal",
        "Liverpool to score in both halves",
        "Over 2.5 total goals",
        "Both teams to score",
        "Mo Salah to score anytime",
        "Vinicius Jr to score first",
        "Real Madrid to keep clean sheet",
        "Liverpool to have most corners",
        "Match to go to penalties",
        "Under 1.5 first half goals",
        "Real Madrid to win from behind",
        "Liverpool to win second half",
        "Exact score 2-1",
        "Exact score 1-1",
        "Exact score 3-2",
        "Player to be sent off",
        "Over 4.5 total cards",
        "Penalty awarded",
        "Own goal scored",
        "Hat-trick scored",
      ][i],
      odds: (Math.random() * 5 + 1).toFixed(1),
      selected: false
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120555] to-[#5b21b6] text-white p-4">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">{matchTitle}</h1>
        <div className="flex justify-between items-center bg-[#a817bc]/50 p-3 rounded-lg border border-[#c13ae3]">
          <div>
            <span className="bg-red-500 text-xs px-2 py-1 rounded-full font-bold uppercase">
              {matchDetails.status}
            </span>
            <p className="text-xl font-bold mt-1">{matchDetails.score}</p>
            <p className="text-sm text-purple-200">{matchDetails.summary}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">{matchDetails.players} players</p>
            <div className="flex items-center justify-end text-yellow-400">
              <Trophy className="w-4 h-4 mr-1" />
              <span className="font-bold">{matchDetails.jackpot}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Match info */}
      <div className="bg-[#a716be]/30 p-3 rounded-lg mb-6 border border-[#c13ae3]/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-purple-300">League</p>
            <p className="font-medium">{matchDetails.league}</p>
          </div>
          <div>
            <p className="text-xs text-purple-300">Date</p>
            <p className="font-medium">{matchDetails.date}</p>
          </div>
          <div>
            <p className="text-xs text-purple-300">Venue</p>
            <p className="font-medium">{matchDetails.venue}</p>
          </div>
        </div>
      </div>

      {/* Betting possibilities */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Betting Possibilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {matchDetails.possibilities.map((possibility) => (
            <div 
              key={possibility.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${possibility.selected ? 'bg-[#c13ae3] border-white' : 'bg-[#a817bc]/30 border-[#c13ae3]/50 hover:bg-[#a817bc]/50'}`}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{possibility.title}</p>
                <span className="bg-white text-[#5b21b6] px-2 py-1 rounded text-sm font-bold">
                  {possibility.odds}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar to your reference code */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Other Matches</h2>
        <div className="flex w-full space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {Array(5).fill(null).map((_, index) => {
            const games = [
              { name: "Nigeria vs Spain", players: 100, jackpot: "$21,000" },
              { name: "Inter Milan vs Chelsea", players: 250, jackpot: "$4,600" },
              { name: "Man United vs Bayern", players: 200, jackpot: "$3,000" },
              { name: "Roma vs Real Sociedad", players: 150, jackpot: "$2,000" },
              { name: "Barcelona vs PSG", players: 180, jackpot: "$3,500" },
            ];
            const game = games[index];
            return (
              <div
                key={`future-${index}`}
                className="snap-start flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <div className="w-[250px] h-[170px] bg-purple-800/50 rounded-lg p-3 border border-purple-600/30 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium text-sm leading-tight truncate max-w-[170px]">
                      {game.name}
                    </span>
                    <div className="bg-gray-600 text-white px-2 py-1 rounded text-[10px] font-semibold leading-none">
                      Today
                    </div>
                  </div>

                  <p className="text-purple-300 text-xs leading-snug break-words overflow-hidden">
                    Champions League match
                  </p>

                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-purple-300">
                      {game.players} players
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Trophy className="w-3.5 h-3.5 mr-1" />
                      <span>{game.jackpot}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchPage;