import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';

const CoinIcon = ({ value, color, onClick, selected }) => (
  <motion.div 
    className={`coin ${selected ? 'selected' : ''}`}
    style={{ backgroundColor: color }}
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <FaCoins size={30} />
    <span>{value}XAF</span>
  </motion.div>
);

export default CoinIcon;
