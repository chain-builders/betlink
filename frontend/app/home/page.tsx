"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Gamepad2,
  Wallet,
  Trophy,
  Zap,
  Star,
  Crown,
  Dice1,
  Dice6,
  TrendingUp,
  Users,
  PlayCircle,
  Sparkles,
  Target,
  Calendar,
  User,
} from "lucide-react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Image from "next/image";
import GamesSection from "@/components/GameSection";

interface Game {
  id: number;
  name: string;
  players: number;
  jackpot: string;
}

const Home = () => {
  const [activeGame, setActiveGame] = useState(0);
  const [glowEffect, setGlowEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowEffect((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const GameCard = ({ game, index }: { game: Game; index: number }) => (
    <div
      className={`bg-gradient-to-br from-purple-900/80 to-pink-900/80 rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        activeGame === index
          ? "border-pink-400 shadow-lg shadow-pink-400/50"
          : "border-purple-600 hover:border-pink-500"
      }`}
      onClick={() => setActiveGame(index)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold text-sm">{game.name}</h3>
        <div className="flex items-center text-yellow-400">
          <Crown className="w-4 h-4 mr-1" />
          <span className="text-xs">{game.jackpot}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-green-400">
          <Users className="w-3 h-3 mr-1" />
          <span>{game.players}</span>
        </div>
        <div className="bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          LIVE
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Star className="w-2 h-2 text-pink-400 opacity-30" />
          </div>
        ))}
      </div>

      <Header />

      {/* Main Content */}
      <main className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Welcome to BetLink
            </h2>
            <p className="text-xl text-purple-300 mb-8">
              Link Up. Cash Out. Level Up!
            </p>

            <div className="flex justify-center space-x-6 mb-8">
              <Button className="py-[15px] px-[27px] inline-flex gap-2 item-center">
                <PlayCircle className="w-6 h-6" />
                <span>Play Guides</span>
              </Button>
              <Button className="py-[15px] px-[27px] inline-flex gap-2 item-center">
                <Gamepad2 className="w-6 h-6" />
                <span>Create a Bet</span>
              </Button>
            </div>
          </div>

          {/* Game Sections */}
          <GamesSection />

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
              <Dice1 className="w-8 h-8 mx-auto mb-3 text-white" />
              <p className="text-white font-bold">Quick Bet</p>
              <p className="text-purple-200 text-sm">Instant Action</p>
            </button>

            <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-white" />
              <p className="text-white font-bold">Leaderboard</p>
              <p className="text-pink-200 text-sm">Top Players</p>
            </button>

            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
              <Users className="w-8 h-8 mx-auto mb-3 text-white" />
              <p className="text-white font-bold">Multiplayer</p>
              <p className="text-indigo-200 text-sm">Join Room</p>
            </button>

            <button
              className={`bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl ${
                glowEffect ? "shadow-2xl shadow-yellow-400/50" : ""
              }`}
            >
              <Dice6 className="w-8 h-8 mx-auto mb-3 text-white" />
              <p className="text-white font-bold">Jackpot</p>
              <p className="text-yellow-200 text-sm">$127,500</p>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">24.7K</div>
                <div className="text-purple-300 text-sm">Active Players</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">$2.1M</div>
                <div className="text-purple-300 text-sm">Total Payouts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">156</div>
                <div className="text-purple-300 text-sm">Games Live</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">99.2%</div>
                <div className="text-purple-300 text-sm">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
