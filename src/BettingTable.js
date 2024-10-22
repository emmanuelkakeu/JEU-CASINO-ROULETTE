import React from 'react';
import { motion } from 'framer-motion';
import './BettingTable.css'

const BettingTable = ({ onBet, bets }) => {
  const numbers = Array.from({ length: 22 }, (_, i) => i);

  return (
    <div className="betting-table">
      <div className="number-grid">
        {numbers.map(number => (
          <motion.div 
            key={number} 
            className={`number ${bets[number] ? 'bet-placed' : ''}`} 
            onClick={() => onBet(number)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {number}
            {bets[number] && <div className="bet-amount">{bets[number]}€</div>}
          </motion.div>
        ))}
      </div>

      <div className="betting-options">
        <motion.button 
          className="red-button" 
          onClick={() => onBet('red')} 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
        >
          Red
        </motion.button>

        <motion.button 
          className="white-button" 
          onClick={() => onBet('white')} 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
        >
          White
        </motion.button>

        <motion.button 
          className="odd-button" 
          onClick={() => onBet('odd')} 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
        >
          Odd
        </motion.button>

        <motion.button 
          className="even-button" 
          onClick={() => onBet('even')} 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
        >
          Even
        </motion.button>
      </div>
    </div>
  );
};


export default BettingTable;