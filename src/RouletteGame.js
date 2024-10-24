import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
//import { FaCoins } from 'react-icons/fa';
import RouletteWheel from './RouletteWheel';
import BettingTable from './BettingTable';
import CoinIcon from './CoinIcon.js';
import './RouletteGame.css';
import { useSearchParams } from 'react-router-dom';



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

  const [searchParams] = useSearchParams();
  const totalNumber = parseInt(searchParams.get('totalNumber')) || 18;

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
        winnings += amount * (bet === result.toString() ? totalNumber : 2);
      }
    });

    setBalance(prev => prev + winnings);
    setBets({});
    setCurrentBet(0);
    setSpinning(false);
  };

  return (

    <div className="table">
      <div className="tablepre flex flex-col ">

      <div className="game-header">
        <h1>Casino Royale Roulette</h1>
        <div className="game-info">
          <div>Balance: {balance}€</div>
          <div>Total Bet: {currentBet}€</div>
        </div>
        <button onClick={() => setSound(!sound)} className="sound-toggle">
          <Volume2 size={34} />
        </button>
      </div>
      
      <div className="improved-roulette-game">
      
      
      <div className="game-layout mt-2">
        <div className="left-column mt-5 flex flex-col items-center">
            <RouletteWheel spinning={spinning} onSpinComplete={handleSpinComplete} />
            <div className="action-buttons mt-4  ">
                 
                  <button 
                    onClick={spin} 
                    disabled={spinning || currentBet === 0} 
                    className="px-8 py-4 bg-green-500 text-white rounded-lg disabled:opacity-50 hover:bg-green-600 transition-colors"
                  >
                    Spin the Wheel
                  </button>
            </div>
          </div>
          <div className="right-column mt-2 flex flex-col ">
            <div >
              <BettingTable onBet={placeBet} bets={bets} />
            </div>

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

            <div className="space-y-2 boutons"> {/* Ajoute un espacement vertical entre les boutons */}
              <button 
                onClick={clearAllBets} 
                disabled={spinning} 
                className="px-8 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 hover:bg-red-600 transition-colors"
              >
                Clear Bets
              </button>
              
              <button 
                onClick={clearAllBets} 
                className="px-8 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 hover:bg-red-600 transition-colors"
              >
                Clear Last Bets
              </button>
            </div>           
          </div>

      </div>

      <AnimatePresence>
        {lastResult !== null && !spinning && (
          <motion.div 
            className="last-result"
            initial={{ y: 50, opacity: 0 }}  // État initial
            animate={{ y: 0, opacity: 1 }}   // État final (visible)
            exit={{ y: -50, opacity: 0 }}    // Animation de sortie (disparition)
            transition={{ duration: 1 }}     // Durée de l'animation d'une seconde
          >
            Last Result: {lastResult} 
          </motion.div>
        )}
    </AnimatePresence>

    </div>
    </div>
    </div>
    
    
  );
};

export default RouletteGame;