import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const RouletteWheel = ({ spinning, onSpinComplete }) => {
  const [wheelRotation, setWheelRotation] = useState(0);
  const [result, setResult] = useState(null);

  const numbers = Array.from({ length: 22 }, (_, i) => i);
  const segmentAngle = 360 / numbers.length; // Chaque segment couvre cet angle

  const getColor = (number) => {
    return number % 2 === 0 ? 'bg-red-500 text-white' : 'bg-black text-white';
  };

  const spinWheel = useCallback(() => {
    const spinDuration = 5000;
    const spinRotations = Math.floor(Math.random() * 5) + 5; // 5 à 10 rotations
    const randomResult = Math.floor(Math.random() * 22); // Choisir le numéro gagnant

    // Angle final correspondant exactement au numéro gagnant
    const finalRotation = spinRotations * 360 + (22 - randomResult) * segmentAngle;

    setWheelRotation(finalRotation);

    setTimeout(() => {
      setResult(randomResult);
    }, spinDuration);

    setTimeout(() => {
      onSpinComplete(randomResult);
    }, spinDuration + 1000); // Le temps pour afficher le résultat avant la réinitialisation
  }, [onSpinComplete]);

  useEffect(() => {
    if (spinning) {
      spinWheel();
    } else {
      setWheelRotation(0);
      setResult(null);
    }
  }, [spinning, spinWheel]);

  return (
    <div className="relative w-96 h-96">
      {/* Roue qui tourne */}
      <motion.div 
        className="absolute inset-0 rounded-full border-8 border-yellow-600 bg-yellow-400 overflow-hidden"
        animate={{ rotate: wheelRotation }}
        transition={{ duration: 5, ease: "easeOut" }}
      >
        {numbers.map((number, index) => {
          const angle = (index * 360) / numbers.length;
          return (
            <div
              key={number}
              className="absolute inset-0"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div className="absolute top-0 left-1/2 h-1/2 w-1 bg-yellow-600 transform -translate-x-1/2"></div>
              <div className="absolute top-4 left-1/2 h-8 w-8 bg-yellow-200 transform -translate-x-1/2 rotate-45"></div>
              <div className={`absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full ${getColor(number)} flex items-center justify-center font-bold text-lg`}>
                {number}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Pointeur triangulaire (fixe) */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className="w-0 h-0 border-l-8 border-r-8 border-t-[36px] border-l-transparent border-r-transparent border-t-blue-600"
          style={{ position: 'absolute', top: '0px', left: '50%', transform: 'translateX(-50%) rotate(360deg)' }} // Pointe vers l'intérieur
        />
      </div>

      {/* Message gagnant */}
      {!spinning && result !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold z-30">
          Numero Gagnant: {result}
        </div>
      )}
    </div>
  );
};

export default RouletteWheel;
