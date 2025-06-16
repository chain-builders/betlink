// app/place-bet/page.tsx
import React from 'react';

type Bet = {
  id: string;
  matchTitle: string;
  createdBy: string;
  createdTime: string;
  startsIn: string;
  players: number;
  prize: string;
  status: 'OPEN' | 'CLOSED';
};

const PlaceBetPage = () => {
  const bets: Bet[] = [
    {
      id: '1',
      matchTitle: 'Nigeria vs Spain',
      createdBy: 'User123',
      createdTime: '2 hours ago',
      startsIn: '1h 45m',
      players: 100,
      prize: '$21,000',
      status: 'OPEN',
    },
    {
      id: '2',
      matchTitle: 'Inter Milan vs Chelsea',
      createdBy: 'FootballFan',
      createdTime: '45 minutes ago',
      startsIn: '30m',
      players: 250,
      prize: '$4,600',
      status: 'OPEN',
    },
    {
      id: '3',
      matchTitle: 'Manchester United vs Bayern Munich',
      createdBy: 'RedDevil99',
      createdTime: '3 hours ago',
      startsIn: '2h 15m',
      players: 200,
      prize: '$3,000',
      status: 'OPEN',
    },
    {
      id: '4',
      matchTitle: 'Real Madrid vs Liverpool',
      createdBy: 'ChampionsLover',
      createdTime: '1 hour ago',
      startsIn: '45m',
      players: 300,
      prize: '$2,250',
      status: 'OPEN',
    },
    {
      id: '5',
      matchTitle: 'Roma vs Real Sociedad',
      createdBy: 'SerieAExpert',
      createdTime: '4 hours ago',
      startsIn: '3h 30m',
      players: 150,
      prize: '$2,000',
      status: 'OPEN',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className=" text-white p-5 rounded-b-xl shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">BetLink</h1>
          <p className="text-sm">Link Up. Cash Out. Level Up!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-[#a716be] border-b-2 border-[#c13ae3] pb-2 mb-6">
          Place a Bet
        </h2>

        {/* Bets List */}
        <div className="space-y-4">
          {bets.map((bet) => (
            <div
              key={bet.id}
              className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#a817bc]"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-[#120555]">
                  {bet.matchTitle}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    bet.status === 'OPEN'
                      ? 'bg-[#a817bc] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {bet.status}
                </span>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <p>
                  <span className="font-semibold">Created:</span> {bet.createdTime} by {bet.createdBy}
                </p>
                <p className="text-[#5b21b6] font-bold">
                  Starts in: {bet.startsIn}
                </p>
              </div>

              <div className="flex justify-between text-sm mt-3">
                <p className="text-[#a716be] font-bold">
                  {bet.players} players
                </p>
                <p className="text-[#5b21b6] font-bold">Prize: {bet.prize}</p>
              </div>

              <button className="w-full mt-3 bg-gradient-to-r from-[#a817bc] to-[#c13ae3] text-white py-2 px-4 rounded font-bold hover:from-[#8e12a0] hover:to-[#a82dc5] transition-all">
                Place Bet
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PlaceBetPage;