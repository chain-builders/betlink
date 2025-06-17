import { Calendar, Sparkles, Trophy, Crown } from "lucide-react";
import { useRef } from "react";
import Scroll from "./Scroll";

interface Game {
  id: number;
  name: string;
  players: number;
  jackpot: string;
  scenario: string;
  league: string;
}

interface GameCardProps {
  game: Game;
}

const GamesSection = () => {
  const ongoingGamesRef = useRef<HTMLDivElement>(null);
  const todaysGamesRef = useRef<HTMLDivElement>(null);
  const futureGamesRef = useRef<HTMLDivElement>(null);

  // Sample data - expanded to 24 games
  const games: Game[] = [
    {
      id: 1,
      name: "Nigeria vs Spain",
      players: 100,
      jackpot: "$1,000",
      scenario: "Nigeria wins 2-1; Spain misses an early penalty.",
      league: "FIFA Nations League",
    },
    {
      id: 2,
      name: "Inter Milan vs Chelsea",
      players: 250,
      jackpot: "$4,000",
      scenario: "Chelsea wins 1-0 on a late counter.",
      league: "Champions League",
    },
    {
      id: 3,
      name: "Manchester United vs Bayern Munich",
      players: 200,
      jackpot: "$3,000",
      scenario:
        "3-3 draw; Man U wins on penalties after Bayern misses first spot kick.",
      league: "Champions League",
    },
    {
      id: 4,
      name: "Real Madrid vs Liverpool",
      players: 150,
      jackpot: "$2,000",
      scenario: "Real Madrid edges 2-1; VAR cancels Liverpool's late goal.",
      league: "Champions League",
    },
    {
      id: 5,
      name: "Roma vs Real Sociedad",
      players: 300,
      jackpot: "$5,000",
      scenario: "Roma wins 2-1; Sociedad down to 10 men after red card.",
      league: "Europa League",
    },
    {
      id: 6,
      name: "Barcelona vs Juventus",
      players: 350,
      jackpot: "$6,000",
      scenario: "Barcelona wins 2-0; Juventus misses a first-half penalty.",
      league: "Champions League",
    },
    {
      id: 7,
      name: "Atletico Madrid vs Dortmund",
      players: 400,
      jackpot: "$7,000",
      scenario: "Atletico wins 2-1 after extra time.",
      league: "Champions League",
    },
    {
      id: 8,
      name: "Arsenal vs PSG",
      players: 450,
      jackpot: "$8,000",
      scenario: "Arsenal wins 2-1; PSG misses open goal in stoppage time.",
      league: "Champions League",
    },
    {
      id: 9,
      name: "AC Milan vs Tottenham",
      players: 180,
      jackpot: "$2,500",
      scenario: "",
      league: "Europa League",
    },
    {
      id: 10,
      name: "Valencia vs Napoli",
      players: 220,
      jackpot: "$3,200",
      scenario: "",
      league: "Europa League",
    },
    {
      id: 11,
      name: "Sevilla vs Frankfurt",
      players: 190,
      jackpot: "$2,800",
      scenario: "",
      league: "Europa League",
    },
    {
      id: 12,
      name: "Ajax vs Lyon",
      players: 160,
      jackpot: "$2,300",
      scenario: "",
      league: "Europa League",
    },
    {
      id: 13,
      name: "Benfica vs Porto",
      players: 140,
      jackpot: "$1,900",
      scenario: "",
      league: "Primeira Liga",
    },
    {
      id: 14,
      name: "Celtic vs Rangers",
      players: 120,
      jackpot: "$1,600",
      scenario: "",
      league: "Scottish Premiership",
    },
    {
      id: 15,
      name: "Lazio vs Atalanta",
      players: 210,
      jackpot: "$3,100",
      scenario: "",
      league: "Serie A",
    },
    {
      id: 16,
      name: "Villarreal vs Betis",
      players: 170,
      jackpot: "$2,400",
      scenario: "",
      league: "La Liga",
    },
    {
      id: 17,
      name: "Leicester vs Brighton",
      players: 130,
      jackpot: "$1,800",
      scenario: "",
      league: "Premier League",
    },
    {
      id: 18,
      name: "Marseille vs Monaco",
      players: 200,
      jackpot: "$2,900",
      scenario: "",
      league: "Ligue 1",
    },
    {
      id: 19,
      name: "Wolfsburg vs Leverkusen",
      players: 180,
      jackpot: "$2,600",
      scenario: "",
      league: "Bundesliga",
    },
    {
      id: 20,
      name: "Fiorentina vs Genoa",
      players: 110,
      jackpot: "$1,500",
      scenario: "",
      league: "Serie A",
    },
    {
      id: 21,
      name: "Real Betis vs Celta Vigo",
      players: 150,
      jackpot: "$2,100",
      scenario: "",
      league: "La Liga",
    },
    {
      id: 22,
      name: "West Ham vs Crystal Palace",
      players: 140,
      jackpot: "$1,900",
      scenario: "",
      league: "Premier League",
    },
    {
      id: 23,
      name: "Nice vs Strasbourg",
      players: 90,
      jackpot: "$1,200",
      scenario: "",
      league: "Ligue 1",
    },
    {
      id: 24,
      name: "Hertha Berlin vs Stuttgart",
      players: 100,
      jackpot: "$1,400",
      scenario: "",
      league: "Bundesliga",
    },
  ];

  const todaysGames = games.slice(0, 24);
  const futureGames = games.slice(0, 24);

  return (
    <div className="space-y-12 mb-12">
      {/* Ongoing Bets Carousel */}
      <div className="relative w-full">
        <div className="flex items-center justify-between mb-4 text-gray-800 transition-all duration-500 hover:-translate-y-2 hover:text-purple-800/50 cursor-pointer">
          <div className="flex items-center text-center">
            <h3 className="text-2xl font-bold text-white hover:text-purple-800/50">
              Ongoing Bets
            </h3>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="relative flex items-center group">
          <Scroll direction="left" containerRef={ongoingGamesRef} />
    <div
  ref={ongoingGamesRef}
  className="flex w-full space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
>
  {[...games, ...games].map((game, index) => (
    <div
      key={`${game.id}-${index}`}
      className="snap-start flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <div className="w-[250px] h-[170px] bg-purple-800/50 rounded-lg p-3 border border-purple-600/30 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white font-medium text-sm leading-tight truncate max-w-[170px]">
            {game.name}
          </span>
          <div className="bg-green-600 text-white px-2 py-1 rounded text-[10px] font-semibold leading-none">
            LIVE
          </div>
        </div>

        <p className="text-purple-300 text-xs leading-snug break-words overflow-hidden">
          {game.scenario}
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
  ))}
</div>
          <Scroll direction="right" containerRef={ongoingGamesRef} />
        </div>
      </div>

      {/* Today's Games Carousel */}
      <div className="relative w-full">
        <div className="flex items-center justify-between mb-4 text-gray-800 transition-all duration-500 hover:-translate-y-2 hover:text-purple-800/50 cursor-pointer">
          <div className="flex items-center text-center">
            <h3 className="text-2xl font-bold text-white hover:text-purple-800/50">
              Today's Games
            </h3>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="relative flex items-center group">
          <Scroll direction="left" containerRef={todaysGamesRef} />
        <div
  ref={todaysGamesRef}
  className="flex w-full space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
>
  {todaysGames.map((game, index) => (
    <div
      key={`today-${game.id}-${index}`}
      className="snap-start flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <div className="w-[250px] h-[170px] bg-purple-800/50 rounded-lg p-3 border border-purple-600/30 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white font-medium text-sm leading-tight truncate max-w-[170px]">
            {game.name}
          </span>
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-semibold leading-none">
            {index < 8
              ? [
                  "1h",
                  "3h",
                  "5h",
                  "30min",
                  "2h",
                  "45min",
                  "1.5h",
                  "4h",
                ][index]
              : "2h"}
          </div>
        </div>

        <p className="text-purple-300 text-xs leading-snug break-words overflow-hidden">
          {game.scenario || `${game.league} match`}
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
  ))}
</div>
          <Scroll direction="right" containerRef={todaysGamesRef} />
        </div>
      </div>

      {/* Future Games Carousel */}
      <div className="relative w-full">
        <div className="flex items-center justify-between mb-4 text-gray-800 transition-all duration-500 hover:-translate-y-2 hover:text-purple-800/50 cursor-pointer">
          <div className="flex items-center text-center">
            <h3 className="text-2xl font-bold text-white hover:text-purple-800/50">
              Future Games
            </h3>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="relative flex items-center group">
          <Scroll direction="left" containerRef={futureGamesRef} />
       <div
  ref={futureGamesRef}
  className="flex w-full space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
>
  {futureGames.map((game, index) => (
    <div
      key={`future-${game.id}-${index}`}
      className="snap-start flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <div className="w-[250px] h-[170px] bg-purple-800/50 rounded-lg p-3 border border-purple-600/30 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white font-medium text-sm leading-tight truncate max-w-[170px]">
            {game.name}
          </span>
          <div className="bg-gray-600 text-white px-2 py-1 rounded text-[10px] font-semibold leading-none">
            {index < 8
              ? [
                  "9/3/25",
                  "9/4/25",
                  "9/5/25",
                  "9/6/25",
                  "9/7/25",
                  "9/8/25",
                  "9/9/25",
                  "9/10/25",
                ][index]
              : "9/15/25"}
          </div>
        </div>

        <p className="text-purple-300 text-xs leading-snug break-words overflow-hidden">
          {game.scenario || `${game.league} match`}
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
  ))}
</div>
          <Scroll direction="right" containerRef={futureGamesRef} />
        </div>
      </div>
    </div>
  );
};

export default GamesSection;
