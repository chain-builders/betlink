"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Wallet,
  Trophy,
  TrendingUp,
  Calendar,
  Star,
  Crown,
  Gamepad2,
  Target,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Hourglass,
  ArrowLeft,
  Edit3,
  Award,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [coins, setCoins] = useState<number>(1250);

  const userData = {
    username: "ProGamer2024",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    joinDate: "March 2024",
    level: 47,
    xp: 12750,
    nextLevelXp: 15000,
    totalBets: 156,
    totalWinnings: 47250.75,
    winRate: 68.5,
    currentStreak: 7,
    bestStreak: 15,
    rank: "Diamond",
    achievements: "23/50",
  };

  type BetStatus = "live" | "pending" | "won" | "lost";

  interface ActiveBet {
    id: number;
    game: string;
    amount: number;
    odds: string;
    status: BetStatus;
    timeLeft: string;
    prediction: string;
  }

  interface BetHistory {
    id: number;
    game: string;
    amount: number;
    odds: string;
    result: BetStatus;
    payout: number;
    date: string;
    prediction: string;
  }

  const activeBets: ActiveBet[] = [
    {
      id: 1,
      game: "Chelsea vs Arsenal",
      amount: 500,
      odds: "2.1x",
      status: "live",
      timeLeft: "45:32",
      prediction: "Chelsea Win",
    },
    {
      id: 2,
      game: "Lakers vs Warriors",
      amount: 750,
      odds: "1.8x",
      status: "pending",
      timeLeft: "2h 15m",
      prediction: "Over 220.5",
    },
    {
      id: 3,
      game: "Dragon's Fortune",
      amount: 250,
      odds: "3.5x",
      status: "live",
      timeLeft: "12:45",
      prediction: "Jackpot Hit",
    },
  ];

  const betHistory: BetHistory[] = [
    {
      id: 1,
      game: "Manchester United vs Liverpool",
      amount: 1000,
      odds: "2.4x",
      result: "won",
      payout: 2400,
      date: "2024-06-15",
      prediction: "Liverpool Win",
    },
    {
      id: 2,
      game: "Space Blaster Tournament",
      amount: 300,
      odds: "4.2x",
      result: "lost",
      payout: 0,
      date: "2024-06-14",
      prediction: "Top 3 Finish",
    },
    {
      id: 3,
      game: "Real Madrid vs Barcelona",
      amount: 800,
      odds: "1.9x",
      result: "won",
      payout: 1520,
      date: "2024-06-13",
      prediction: "Over 2.5 Goals",
    },
    {
      id: 4,
      game: "Neon Rush Championship",
      amount: 450,
      odds: "3.1x",
      result: "won",
      payout: 1395,
      date: "2024-06-12",
      prediction: "Score > 50k",
    },
    {
      id: 5,
      game: "Crystal Quest Finals",
      amount: 600,
      odds: "2.8x",
      result: "lost",
      payout: 0,
      date: "2024-06-11",
      prediction: "Complete Quest",
    },
  ];

  const getStatusIcon = (status: BetStatus) => {
    switch (status) {
      case "live":
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case "pending":
        return <Hourglass className="w-4 h-4 text-blue-400" />;
      case "won":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "lost":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: BetStatus) => {
    switch (status) {
      case "live":
        return "text-yellow-400 bg-yellow-900/30 border-yellow-600/30";
      case "pending":
        return "text-blue-400 bg-blue-900/30 border-blue-600/30";
      case "won":
        return "text-green-400 bg-green-900/30 border-green-600/30";
      case "lost":
        return "text-red-400 bg-red-900/30 border-red-600/30";
      default:
        return "text-gray-400 bg-gray-900/30 border-gray-600/30";
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="z-50 px-6 py-2 backdrop-blur-sm relative">
        <div className="flex items-center justify-between">
          <Link href="/home">
            <Image
              src="/assets/logo.png"
              alt="BetLinkLogo"
              className="w-20 ml-5 cursor-pointer"
              width={80}
              height={80}
            />
          </Link>

          <div className="flex items-center text-center space-x-4 justify-center">
            <div className="bg-purple-950/50 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-600">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/wallet.png"
                  alt="BetLinkLogo"
                  className="w-5"
                  width={80}
                  height={80}
                />
                <span className="text-yellow-400 font-bold">
                  {coins.toLocaleString()}
                </span>
                <span className="text-purple-300 text-sm">points</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-purple-900/40 p-1 rounded-xl border border-purple-600/30">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "details"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "text-purple-300 hover:text-white hover:bg-purple-800/50"
            }`}
          >
            <User className="w-5 h-5 inline mr-2" />
            User Details
          </button>
          <button
            onClick={() => setActiveTab("bets")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "bets"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "text-purple-300 hover:text-white hover:bg-purple-800/50"
            }`}
          >
            <Target className="w-5 h-5 inline mr-2" />
            Your Bets
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "history"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "text-purple-300 hover:text-white hover:bg-purple-800/50"
            }`}
          >
            <Clock className="w-5 h-5 inline mr-2" />
            History
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "details" && (
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-gradient-to-br backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 flex item-center justify-start gap-6">
              {/* Wallet Address */}
              <div className="bg-purple-800/30 rounded-lg p-4 mb-6">
                <p className="text-purple-300 text-sm mb-2">Wallet Address</p>
                <p className="text-white font-mono text-sm break-all">
                  {userData.walletAddress}
                </p>
              </div>
              {/* Balance */}
              <div className="bg-purple-800/30 rounded-lg p-4 mb-6">
                <p className="text-purple-300 text-sm mb-2">Balance</p>
                <p className="text-white font-mono text-sm break-all">
                  {userData.walletAddress}
                </p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-4 mb-6">
                <p className="text-purple-300 text-sm mb-2">Chain</p>
                <p className="text-white font-mono text-sm break-all">
                  {userData.walletAddress}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-900/40 rounded-xl p-4 border border-green-600/30">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  ${userData.totalWinnings.toLocaleString()}
                </div>
                <div className="text-green-300 text-sm">Total Winnings</div>
              </div>

              <div className="bg-blue-900/40 rounded-xl p-4 border border-blue-600/30">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-6 h-6 text-blue-400" />
                  <span className="text-blue-300 text-sm">
                    {userData.winRate}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {userData.totalBets}
                </div>
                <div className="text-blue-300 text-sm">Total Bets</div>
              </div>

              <div className="bg-yellow-900/40 rounded-xl p-4 border border-yellow-600/30">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <Crown className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {userData.currentStreak}
                </div>
                <div className="text-yellow-300 text-sm">Current Streak</div>
              </div>

              <div className="bg-purple-900/40 rounded-xl p-4 border border-purple-600/30">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-6 h-6 text-purple-400" />
                  <span className="text-purple-300 text-xs">
                    {userData.rank}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {userData.achievements}
                </div>
                <div className="text-purple-300 text-sm">Achievements</div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 rounded-xl p-6 border border-indigo-600/30">
                <h3 className="text-lg font-bold text-white mb-4">
                  Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-indigo-300">Win Rate</span>
                    <span className="text-white font-semibold">
                      {userData.winRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-300">Best Streak</span>
                    <span className="text-white font-semibold">
                      {userData.bestStreak} wins
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-300">Current Rank</span>
                    <span className="text-white font-semibold">
                      {userData.rank}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bets" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Active Bets</h2>
              <div className="bg-purple-800/50 rounded-full px-4 py-2 border border-purple-600">
                <span className="text-purple-300 text-sm">
                  {activeBets.length} active
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              {activeBets.map((bet) => (
                <div
                  key={bet.id}
                  className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-600/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(bet.status)}
                      <h3 className="text-lg font-bold text-white">
                        {bet.game}
                      </h3>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                        bet.status
                      )}`}
                    >
                      {bet.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-purple-300 text-sm">Prediction</p>
                      <p className="text-white font-semibold">
                        {bet.prediction}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Amount</p>
                      <p className="text-white font-semibold">${bet.amount}</p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Odds</p>
                      <p className="text-white font-semibold">{bet.odds}</p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Time Left</p>
                      <p className="text-white font-semibold">{bet.timeLeft}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Betting History</h2>
              <div className="bg-purple-800/50 rounded-full px-4 py-2 border border-purple-600">
                <span className="text-purple-300 text-sm">
                  {betHistory.length} total bets
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              {betHistory.map((bet) => (
                <div
                  key={bet.id}
                  className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-600/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(bet.result)}
                      <h3 className="text-lg font-bold text-white">
                        {bet.game}
                      </h3>
                    </div>
                    <div className="text-purple-300 text-sm">{bet.date}</div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-purple-300 text-sm">Prediction</p>
                      <p className="text-white font-semibold">
                        {bet.prediction}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Amount</p>
                      <p className="text-white font-semibold">${bet.amount}</p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Odds</p>
                      <p className="text-white font-semibold">{bet.odds}</p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Result</p>
                      <div
                        className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                          bet.result
                        )}`}
                      >
                        {bet.result.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Payout</p>
                      <p
                        className={`font-semibold ${
                          bet.result === "won"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {bet.result === "won"
                          ? `+$${bet.payout}`
                          : `-$${bet.amount}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserPage;
