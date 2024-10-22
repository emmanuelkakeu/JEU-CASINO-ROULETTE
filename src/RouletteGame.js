import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
//import { FaCoins } from 'react-icons/fa';
import RouletteWheel from './RouletteWheel';
import BettingTable from './BettingTable';
import CoinIcon from './CoinIcon.js';
import './RouletteGame.css';

const COIN_VALUES = [50, 100, 200, 500, 1000];
const COIN_COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7d794', '#786fa6'];

const RouletteGame = () => {
  const [balance, setBalance] = useState(10000);
  const [currentBet, setCurrentBet] = useState(0);
  const [bets, setBets] = useState({});
  const [lastResult, setLastResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(COIN_VALUES[0]);
  const [sound, setSound] = useState(true);

  const placeBet = (number) => {
    if (balance >= selectedCoin) {
      setBets(prev => ({
        ...prev,
        [number]: (prev[number] || 0) + selectedCoin
      }));
      setCurrentBet(prev => prev + selectedCoin);
      setBalance(prev => prev - selectedCoin);
    }
  };

  const clearAllBets = () => {
    setBalance(prev => prev + currentBet);
    setBets({});
    setCurrentBet(0);
  };

  const spin = () => {
    if (currentBet > 0) {
      console.log("Spinning the wheel!");
      setSpinning(true);
    }
  };
  
  const handleSpinComplete = (result) => {
    setLastResult(result);

    let winnings = 0;
    Object.entries(bets).forEach(([bet, amount]) => {
      if (
        (bet === result.toString()) ||
        (bet === 'red' && result % 2 === 0) ||
        (bet === 'black' && result % 2 !== 0) ||
        (bet === 'odd' && result % 2 !== 0) ||
        (bet === 'even' && result % 2 === 0)
      ) {
        winnings += amount * (bet === result.toString() ? 22 : 2);
      }
    });

    setBalance(prev => prev + winnings);
    setBets({});
    setCurrentBet(0);
    setSpinning(false);
  };

  return (
    <div className="improved-roulette-game">
      <div className="game-header">
        <h1>Casino Royale Roulette</h1>
        <div className="game-info">
          <div>Balance: {balance}€</div>
          <div>Total Bet: {currentBet}€</div>
        </div>
        <button onClick={() => setSound(!sound)} className="sound-toggle">
          <Volume2 size={24} />
        </button>
      </div>
      
      <div className="game-layout">
        <div className="left-column">
            <RouletteWheel spinning={spinning} onSpinComplete={handleSpinComplete} />
            <div className="action-buttons mt-4 flex justify-center space-x-4">
                  <button 
                    onClick={clearAllBets} 
                    disabled={spinning} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 hover:bg-red-600 transition-colors"
                  >
                    Clear Bets
                  </button>
                  <button 
                    onClick={spin} 
                    disabled={spinning || currentBet === 0} 
                    className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 hover:bg-green-600 transition-colors"
                  >
                    Spin the Wheel
                  </button>
                </div>
          </div>
          <div className="right-column">
            <BettingTable onBet={placeBet} bets={bets} />
            <div className="coin-rack">
              {COIN_VALUES.map((value, index) => (
                <CoinIcon 
                  key={value} 
                  value={value} 
                  color={COIN_COLORS[index]} 
                  onClick={() => setSelectedCoin(value)}
                  selected={selectedCoin === value}
                />
              ))}
            </div>
          </div>
      </div>

      <AnimatePresence>
        {lastResult !== null && !spinning && (
          <motion.div 
            className="last-result"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            Last Result: {lastResult}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RouletteGame;