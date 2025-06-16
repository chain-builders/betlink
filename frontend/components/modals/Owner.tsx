import React, { useState } from "react";
import {
  X,
  Wallet,
  ArrowUpRight,
  Eye,
  EyeOff,
  Crown,
  TrendingUp,
  DollarSign,
  Shield,
  Copy,
  Check,
} from "lucide-react";

const OwnerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [addressCopied, setAddressCopied] = useState(false);

  const ownerData = {
    balance: 847250.75,
    totalEarnings: 1250000.0,
    activeContracts: 47,
    weeklyEarnings: 125000.5,
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(ownerData.walletAddress);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  const handleWithdraw = () => {
    if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
      alert(`Withdrawal of $${withdrawAmount} initiated!`);
      setWithdrawAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
      {/* Trigger Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Open Owner Panel
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Modal Content */}
          <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-2xl border border-purple-500/50 shadow-2xl shadow-purple-500/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-purple-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Owner Panel
                    </h2>
                    <p className="text-purple-300 text-sm">
                      Contract Administrator
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-purple-800/50 hover:bg-purple-700/50 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Balance Section */}
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 rounded-xl p-4 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 font-semibold">
                      Total Balance
                    </span>
                  </div>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {showBalance ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {showBalance
                    ? `$${ownerData.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}`
                    : "••••••••"}
                </div>
                <div className="text-green-400 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% this week
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-800/40 rounded-lg p-4 border border-purple-600/30">
                  <div className="text-purple-300 text-sm mb-1">
                    Total Earnings
                  </div>
                  <div className="text-white font-bold text-lg">
                    ${ownerData.totalEarnings.toLocaleString()}
                  </div>
                </div>
                <div className="bg-pink-800/40 rounded-lg p-4 border border-pink-600/30">
                  <div className="text-pink-300 text-sm mb-1">
                    Active Contracts
                  </div>
                  <div className="text-white font-bold text-lg">
                    {ownerData.activeContracts}
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="bg-gradient-to-r from-purple-800/40 to-pink-800/40 rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 text-sm">
                      Wallet Address
                    </span>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {addressCopied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="text-white text-sm font-mono bg-black/30 rounded p-2 break-all">
                  {ownerData.walletAddress}
                </div>
              </div>

              {/* Withdraw Section */}
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center space-x-2 mb-4">
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-semibold">
                    Withdraw Funds
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-green-300 text-sm mb-2 block">
                      Amount (USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-black/40 border border-green-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setWithdrawAmount((ownerData.balance * 0.25).toString())
                      }
                      className="flex-1 bg-green-800/40 hover:bg-green-700/40 border border-green-600/30 rounded-lg py-2 text-green-300 text-sm font-semibold transition-colors"
                    >
                      25%
                    </button>
                    <button
                      onClick={() =>
                        setWithdrawAmount((ownerData.balance * 0.5).toString())
                      }
                      className="flex-1 bg-green-800/40 hover:bg-green-700/40 border border-green-600/30 rounded-lg py-2 text-green-300 text-sm font-semibold transition-colors"
                    >
                      50%
                    </button>
                    <button
                      onClick={() =>
                        setWithdrawAmount(ownerData.balance.toString())
                      }
                      className="flex-1 bg-green-800/40 hover:bg-green-700/40 border border-green-600/30 rounded-lg py-2 text-green-300 text-sm font-semibold transition-colors"
                    >
                      MAX
                    </button>
                  </div>

                  <button
                    onClick={handleWithdraw}
                    disabled={
                      !withdrawAmount || parseFloat(withdrawAmount) <= 0
                    }
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
                  >
                    Initiate Withdrawal
                  </button>
                </div>
              </div>

              {/* Weekly Earnings */}
              <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-lg p-4 border border-yellow-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-yellow-300 text-sm">
                      This Week's Earnings
                    </div>
                    <div className="text-white font-bold text-xl">
                      $
                      {ownerData.weeklyEarnings.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div className="bg-yellow-600/20 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerModal;
