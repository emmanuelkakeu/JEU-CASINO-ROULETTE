import React from 'react';
import { motion } from 'framer-motion';
import './BettingTable.css'
import { useSearchParams } from 'react-router-dom';

const BettingTable = ({ onBet, bets }) => {

 

  const [searchParams] = useSearchParams();
  const totalNumber = parseInt(searchParams.get('totalNumber')) || 18;
  const numbers = Array.from({ length: totalNumber }, (_, i) => i);
  console.log("Total number from URL:", totalNumber);


  //const numbers = Array.from({ length: 22 }, (_, i) => i);

  return (
    <div className="betting-table">

      {/* <h1> total number : {totalNumber} </h1> */}
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
            {bets[number] && <div className="bet-amount">{bets[number]}F</div>}
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