// app/page.js - UX OPTIMIZED VERSION
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Scene from "./components/Scene";
import { getCryptoData } from "./lib/cryptoApi";
import { FaSync, FaArrowUp, FaArrowDown, FaExpand } from "react-icons/fa";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showAllCoins, setShowAllCoins] = useState(false);

  // Data Loading
  useEffect(() => {
    let mounted = true;

    const loadCryptoData = async () => {
      try {
        setRefreshing(true);
        const data = await getCryptoData();
        if (mounted) {
          setCoins(data);
          setLoading(false);
          setRefreshing(false);
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        if (mounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    loadCryptoData();
    const interval = setInterval(loadCryptoData, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-linear-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-cyan-500/20 animate-pulse">
            <FaSync className="text-2xl text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Loading Crypto Galaxy...
          </h2>
        </div>
      </div>
    );
  }

  const displayedCoins = showAllCoins ? coins : coins.slice(0, 8);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-500/10 via-purple-500/5 to-transparent"></div>
      
      {/* Main Layout */}
      <div className="relative z-10 container mx-auto px-4">
        
        {/* Header */}
        <header className="text-center pt-6 pb-8">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-14 h-14 bg-linear-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <FaSync className="text-xl text-white" />
              </div>
              <h1 className="text-4xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CRYPTO GALAXY
              </h1>
            </div>
            <div className="h-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full mb-2 mx-auto w-48"></div>
            <p className="text-cyan-200/70 text-sm tracking-widest">
              INTERACTIVE 3D VISUALIZATION
            </p>
          </div>
        </header>

        {/* 3D Scene - MAIN FOCUS */}
        <div className="h-[50vh] rounded-2xl border border-cyan-500/30 bg-black/30 backdrop-blur-lg shadow-2xl shadow-cyan-500/10 mb-6 relative overflow-hidden">
          <Scene coins={coins}
          onPlanetClick={setSelectedCoin} />
        </div>

        {/* COIN GRID */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/10 mb-6">
          
          {/* Grid Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Live Crypto Planets
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-cyan-300/70 text-sm">
                {coins.length} coins total
              </span>
              <button
                onClick={() => {
                  const loadCryptoData = async () => {
                    try {
                      setRefreshing(true);
                      const data = await getCryptoData();
                      setCoins(data);
                      setRefreshing(false);
                    } catch (error) {
                      console.error("Error:", error);
                      setRefreshing(false);
                    }
                  };
                  loadCryptoData();
                }}
                disabled={refreshing}
                className="bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all transform hover:scale-105 shadow-lg cursor-pointer"
                title="Refresh data"
              >
                <FaSync className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* RESPONSIVE COIN GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
            {displayedCoins.map((coin) => (
              <div 
                key={coin.id}
                className="bg-linear-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-3 border border-cyan-500/20 
                           hover:border-cyan-400/60 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20
                           transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCoin(coin)}
              >
                {/* Coin Image & Symbol */}
                <div className="flex items-center justify-between mb-2">
                  <Image 
                    src={coin.image} 
                    alt={coin.name} 
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <div className={`text-xs px-1.5 py-0.5 rounded ${
                    coin.price_change_percentage_24h > 0 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(1)}%
                  </div>
                </div>

                {/* Coin Info */}
                <div className="text-center">
                  <div className="font-bold text-white text-sm mb-1">
                    {coin.symbol.toUpperCase()}
                  </div>
                  <div className="text-cyan-300 text-lg font-bold leading-tight">
                    €{coin.current_price < 1 ? coin.current_price.toFixed(4) : coin.current_price.toFixed(2)}
                  </div>
                  <div className="text-gray-400 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click for details
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SHOW MORE/LESS BUTTON */}
          {coins.length > 8 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllCoins(!showAllCoins)}
                className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <FaExpand className="inline w-3 h-3 mr-2" />
                {showAllCoins ? `Show Less` : `Show ${coins.length - 8} More Coins`}
              </button>
            </div>
          )}
        </div>

        {/* Market Overview - Clean & Minimal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-linear-to-br from-cyan-500/10 to-cyan-600/10 rounded-xl p-4 border border-cyan-500/20">
            <div className="text-cyan-300 text-sm">Market Cap</div>
            <div className="text-xl font-bold text-cyan-400">
              €{(coins.reduce((sum, coin) => sum + coin.market_cap, 0) / 1e12).toFixed(2)}T
            </div>
          </div>
          
          <div className="bg-linear-to-br from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-500/20">
            <div className="text-green-300 text-sm">Bullish</div>
            <div className="text-xl font-bold text-green-400">
              {coins.filter(c => c.price_change_percentage_24h > 0).length}
            </div>
          </div>
          
          <div className="bg-linear-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-4 border border-purple-500/20">
            <div className="text-purple-300 text-sm">Volume 24h</div>
            <div className="text-xl font-bold text-purple-400">
              €{(coins.reduce((sum, coin) => sum + coin.total_volume, 0) / 1e9).toFixed(1)}B
            </div>
          </div>
          
          <div className="bg-linear-to-br from-pink-500/10 to-pink-600/10 rounded-xl p-4 border border-pink-500/20">
            <div className="text-pink-300 text-sm">Active</div>
            <div className="text-xl font-bold text-pink-400">
              {coins.length}
            </div>
          </div>
        </div>
      </div>

      {/* Coin Detail Modal */}
      {selectedCoin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl border border-cyan-500/30 p-6 max-w-md w-full shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image 
                  src={selectedCoin.image} 
                  alt={selectedCoin.name} 
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedCoin.name}</h3>
                  <div className="text-cyan-300">{selectedCoin.symbol.toUpperCase()}</div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCoin(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Price:</span>
                <span className="text-2xl font-bold text-cyan-400">
                  €{selectedCoin.current_price}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h Change:</span>
                <span className={`flex items-center gap-1 ${
                  selectedCoin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedCoin.price_change_percentage_24h > 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(selectedCoin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Market Cap:</span>
                <span className="text-cyan-300">€{(selectedCoin.market_cap / 1e9).toFixed(2)}B</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Volume:</span>
                <span className="text-purple-300">€{(selectedCoin.total_volume / 1e6).toFixed(0)}M</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}