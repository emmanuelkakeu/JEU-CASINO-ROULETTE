import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './RouletteWheel.css';
import { useSearchParams } from 'react-router-dom';

const RouletteWheel = ({ spinning, onSpinComplete }) => {
  const [wheelRotation, setWheelRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false); // État pour gérer l'affichage temporaire du résultat


  const [searchParams] = useSearchParams();
  const totalNumber = parseInt(searchParams.get('totalNumber')) || 18;
  const numbers = Array.from({ length: totalNumber }, (_, i) => i);
  console.log("Total number from URL:", totalNumber);

  // Calcul de l'angle de chaque segment (22 segments dans la roue)
  const segmentAngle = 360 /totalNumber;

  // Alternating colors: Red for even numbers, Black for odd numbers
  const getColor = (number) => {
    return number % 2 === 0 ? 'bg-red-500 text-white' : 'bg-black text-white';
  };

  const spinWheel = useCallback(() => {
    const spinDuration = 5000; // Duration of spin in milliseconds
    const spinRotations = Math.floor(Math.random() * 5) + 5; // 5 to 10 full rotations

    const randomResult = Math.floor(Math.random() * totalNumber);
    const finalRotation = spinRotations * 360 + (totalNumber - randomResult) * segmentAngle;
  
    // Apply the rotation to the wheel
    setWheelRotation(finalRotation);

    // Call onSpinComplete function after a delay to reset the spin and show the result after the wheel returns to its position
    setTimeout(() => {
      onSpinComplete(randomResult);
      setResult(randomResult);
      setTimeout(() => {
        setShowResult(true); // Show the result after the wheel stops
      }, 500); 
      setTimeout(() => setShowResult(false), 2000);
    }, spinDuration);

  }, [onSpinComplete, segmentAngle, totalNumber]);

  useEffect(() => {
    if (spinning) {
      // If the spin button is activated, launch the spin function
      spinWheel();
    } else {
      // If the spin is complete, reset the state
      setWheelRotation(0);
      setShowResult(false);
    }
  }, [spinning, spinWheel]);

  return (
    <div className="roulette-wheel-container">
      {/* 3D Wheel with bombed effect */}
      <motion.div 
        className="roulette-wheel"
        animate={{ rotate: wheelRotation }}
        transition={{ duration: 5, ease: "easeOut" }}
      >
        {numbers.map((number, index) => {
          const angle = (index * 360) /totalNumber;
          return (
            <div
              key={number}
              className="absolute inset-0"
              style={{
                transform: `rotate(${angle}deg)`, // Position each number
              }}
            >
              <div className="absolute top-0 left-1/2 h-1/2 w-2 bg-yellow-600 transform -translate-x-1/2"></div>
              <div className="absolute top-4 left-1/2 h-9 w-9 bg-yellow-200 transform -translate-x-1/2 rotate-45"></div>
              <div className={`absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${getColor(number)} flex items-center justify-center font-bold text-lg number-slot`}>
                {number}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Pointer at the center */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className="w-0 h-0 border-l-8 border-r-8 border-t-[36px] border-l-transparent border-r-transparent border-t-blue-600"
          style={{ position: 'absolute', top: '0px', left: '50%', transform: 'translateX(-50%) rotate(360deg)' }}
        />
      </div>

      {/* Winning result */}
      {!spinning && showResult && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold z-30">
          Numero Gagnant: {result}
        </div>
      )}
    </div>
  );
};

export default RouletteWheel;
