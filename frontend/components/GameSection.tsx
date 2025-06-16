import { useRef } from "react";
import { Calendar, Sparkles, Trophy, Crown } from "lucide-react";

interface Game {
  id: number;
  name: string;
  players: number;
  jackpot: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="bg-purple-800/50 rounded-lg p-4 border border-purple-600/30 min-w-[250px] min-h-[100px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-semibold">{game.name}</span>
        <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">
          LIVE
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-purple-300">{game.players} players</span>
        <div className="flex items-center text-yellow-400">
          <Trophy className="w-4 h-4 mr-1" />
          <span>{game.jackpot}</span>
        </div>
      </div>
    </div>
  );
};

const GamesSection = () => {
  const ongoingBetsRef = useRef<HTMLDivElement>(null);
  const todaysGamesRef = useRef<HTMLDivElement>(null);
  const futureGamesRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;

    const { scrollLeft, clientWidth, scrollWidth } = ref.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    ref.current.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });

    // Handle infinite scroll
    if (direction === "right" && scrollTo >= scrollWidth / 2) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollTo({
            left: scrollTo - scrollWidth / 2,
            behavior: "auto",
          });
        }
      }, 500);
    } else if (direction === "left" && scrollTo <= 0) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollTo({
            left: scrollWidth / 2 - clientWidth,
            behavior: "auto",
          });
        }
      }, 500);
    }
  };

  // Sample data
  const games: Game[] = [
    { id: 1, name: "Game 1", players: 100, jackpot: "$1,000" },
    { id: 2, name: "Game 2", players: 150, jackpot: "$2,000" },
    { id: 3, name: "Game 3", players: 200, jackpot: "$3,000" },
    { id: 4, name: "Game 4", players: 250, jackpot: "$4,000" },
    { id: 5, name: "Game 5", players: 300, jackpot: "$5,000" },
    { id: 6, name: "Game 6", players: 350, jackpot: "$6,000" },
    { id: 7, name: "Game 7", players: 400, jackpot: "$7,000" },
    { id: 8, name: "Game 8", players: 450, jackpot: "$8,000" },
  ];

  const todaysGames = [1, 2, 3, 4, 5, 6, 7, 8];
  const futureGames = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-12 mb-12">
      {/* Ongoing Bets Carousel */}
      <div className="relative w-full">
        <div
          className="flex items-center justify-between mb-4 text-gray-800 
               transition-all duration-500 hover:-translate-y-2 hover:text-purple-800/50"
        >
          <div className="flex items-center text-center ">
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
          {/* <div className="mt-1 mx-6 hover:purple-800/50">see more</div> */}
        </div>

        <div className="relative flex items-center">
          <button
            onClick={() => scrollCarousel(ongoingBetsRef, "left")}
            className="absolute left-0 z-10 w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll carousel left"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={ongoingBetsRef}
            className="flex w-full space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {[...games, ...games].map((game, index) => (
              <div
                key={`${game.id}-${index}`}
                className="snap-start flex-shrink-0"
              >
                <GameCard game={game} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel(ongoingBetsRef, "right")}
            className="absolute right-0 z-10 w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll carousel right"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Today's Games Carousel */}
      <div className="relative w-full">
        <div
          className="flex items-center justify-between mb-4 text-gray-800 
               transition-all duration-500 hover:-translate-y-2 hover:text-purple-800/50"
        >
          <div className="flex items-center text-center ">
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
          {/* <div className="mt-1 mx-6 hover:purple-800/50">see more</div> */}
        </div>

        <div className="relative flex items-center">
          <button
            onClick={() => scrollCarousel(todaysGamesRef, "left")}
            className="absolute left-0 z-10 w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll carousel left"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={todaysGamesRef}
            className="flex w-full space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {[...todaysGames, ...todaysGames].map((index, i) => (
              <div
                key={`today-${index}-${i}`}
                className="snap-start flex-shrink-0"
              >
                <div className="bg-indigo-800/50 rounded-lg p-4 border border-indigo-600/30 min-w-[250px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">
                      Match {index}
                    </span>
                    <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                      LIVE
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-300">vs AI Bot</span>
                    <div className="flex items-center text-yellow-400">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span>+{50 * index} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel(todaysGamesRef, "right")}
            className="absolute right-0 z-10 w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll carousel right"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Future Games Carousel */}
      <div className="relative w-full">
        <div
          className="flex items-center justify-between mb-4 text-gray-800 
               transition-all duration-500 hover:-translate-y-2 hover:text-purple-800/50"
        >
          <div className="flex items-center text-center ">
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
          {/* <div className="mt-1 mx-6 hover:purple-800/50">see more</div> */}
        </div>

        <div className="relative flex items-center">
          <button
            onClick={() => scrollCarousel(futureGamesRef, "left")}
            className="absolute left-0 z-10 w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll carousel left"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={futureGamesRef}
            className="flex w-full space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            {[...futureGames, ...futureGames].map((index, i) => (
              <div
                key={`future-${index}-${i}`}
                className="snap-start flex-shrink-0"
              >
                <div className="bg-pink-800/50 rounded-lg p-4 border border-pink-600/30 min-w-[250px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">
                      Tournament {index}
                    </span>
                    <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs">
                      {index}H
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-pink-300">
                      Entry: {index * 100} coins
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Crown className="w-4 h-4 mr-1" />
                      <span>${index * 5}K</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel(futureGamesRef, "right")}
            className="absolute right-0 z-10 w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll carousel right"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesSection;
