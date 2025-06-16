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
import Link from "next/link";

const Home = () => {
  const [activeGame, setActiveGame] = useState(0);
  const [glowEffect, setGlowEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowEffect((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
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

            <div className="flex justify-center space-x-8 gap-3 mb-4">
              <Link href="/playGuides" className="m-0 p-0">
                <Button className="py-[15px] px-[27px] inline-flex gap-2 item-center">
                  <PlayCircle className="w-6 h-6" />
                  <span>Play Guides</span>
                </Button>
              </Link>
              <Link href="">
                <Button className="py-[15px] px-[27px] inline-flex gap-2 item-center">
                  <Gamepad2 className="w-6 h-6" />
                  <span>Create a Bet</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Game Sections */}
          <GamesSection />

          {/* Action Buttons */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/placeABet">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl w-64 text-center">
                <Dice1 className="w-8 h-8 mx-auto mb-3 text-white" />
                <p className="text-white font-bold">Quick Bet</p>
                <p className="text-purple-200 text-sm">Instant Action</p>
              </button>

</Link>
<Link href="/leaderboard">
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl w-64 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-white" />
                <p className="text-white font-bold">Leaderboard</p>
                <p className="text-pink-200 text-sm">Top Players</p>
              </button>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 mb-6">
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
