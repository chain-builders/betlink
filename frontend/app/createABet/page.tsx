import { notFound } from 'next/navigation';
import { Trophy, Calendar, Clock, MapPin } from 'lucide-react';

interface Game {
  id: number;
  name: string;
  slug: string;
  players: number;
  jackpot: string;
  scenario: string;
  league: string;
  status?: 'live' | 'upcoming' | 'completed';
  time?: string;
  date?: string;
  venue?: string;
  score?: string;
  possibilities?: {
    id: number;
    title: string;
    odds: string;
  }[];
}

async function getGameBySlug(slug: string): Promise<Game | null> {
  const games: Game[] = [
    {
      id: 1,
      name: "Nigeria vs Spain",
      slug: "nigeria-vs-spain",
      players: 100,
      jackpot: "$21,000",
      scenario: "Nigeria wins 2-1; Spain misses an early penalty.",
      league: "FIFA Nations League",
      status: 'live',
      score: "2-1",
      venue: "National Stadium, Lagos",
      possibilities: Array(20).fill(null).map((_, i) => ({
        id: i + 1,
        title: [
          "Nigeria to win by exactly 1 goal",
          "Spain to score in both halves",
          "Over 2.5 total goals",
          "Both teams to score",
          "Victor Osimhen to score anytime",
          "Alvaro Morata to score first",
          "Nigeria to keep clean sheet",
          "Spain to have most corners",
          "Match to have a penalty awarded",
          "Under 1.5 first half goals",
          "Nigeria to win from behind",
          "Spain to win second half",
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
      }))
    },
    // Add all other games with their full details
    // ...
  ];

  return games.find(game => game.slug === slug) || null;
}

export default async function MatchPage({ params }: { params: { slug: string } }) {
  const game = await getGameBySlug(params.slug);
  
  if (!game) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120555] to-[#5b21b6] text-white p-4">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">{game.name}</h1>
        <div className="flex justify-between items-center bg-[#a817bc]/50 p-3 rounded-lg border border-[#c13ae3]">
          <div>
            <span className="bg-red-500 text-xs px-2 py-1 rounded-full font-bold uppercase">
              {game.status?.toUpperCase()}
            </span>
            {game.score && (
              <p className="text-xl font-bold mt-1">{game.score}</p>
            )}
            <p className="text-sm text-purple-200">{game.scenario}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">{game.players} players</p>
            <div className="flex items-center justify-end text-yellow-400">
              <Trophy className="w-4 h-4 mr-1" />
              <span className="font-bold">{game.jackpot}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Match info */}
      <div className="bg-[#a716be]/30 p-3 rounded-lg mb-6 border border-[#c13ae3]/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-1 text-purple-300" />
              <p className="text-xs text-purple-300">League</p>
            </div>
            <p className="font-medium">{game.league}</p>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <Clock className="w-4 h-4 mr-1 text-purple-300" />
              <p className="text-xs text-purple-300">Status</p>
            </div>
            <p className="font-medium">{game.status === 'live' ? 'In Progress' : game.time || game.date}</p>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1 text-purple-300" />
              <p className="text-xs text-purple-300">Venue</p>
            </div>
            <p className="font-medium">{game.venue || 'TBD'}</p>
          </div>
        </div>
      </div>

      {/* Betting possibilities */}
      {game.possibilities && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Betting Possibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {game.possibilities.map((possibility) => (
              <div 
                key={possibility.id}
                className="p-4 rounded-lg border cursor-pointer transition-all bg-[#a817bc]/30 border-[#c13ae3]/50 hover:bg-[#a817bc]/50"
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
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const games = [
    { slug: "nigeria-vs-spain" },
    { slug: "inter-milan-vs-chelsea" },
    { slug: "manchester-united-vs-bayern-munich" },
    { slug: "real-madrid-vs-liverpool" },
    { slug: "roma-vs-real-sociedad" },
    // Add all other game slugs
  ];
  
  return games;
}