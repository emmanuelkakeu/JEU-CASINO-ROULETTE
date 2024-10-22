import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const RouletteWheel = ({ spinning, onSpinComplete }) => {
  const [wheelRotation, setWheelRotation] = useState(0);
  const [result, setResult] = useState(null);

  const numbers = Array.from({ length: 22 }, (_, i) => i);

  // Calcul de l'angle de chaque segment (22 segments dans la roue)
  const segmentAngle = 360 / numbers.length; // Chaque segment couvre cet angle

  const getColor = (number) => {
    return number % 2 === 0 ? 'bg-red-500 text-white' : 'bg-black text-white';
  };

  const spinWheel = useCallback(() => {
    const spinDuration = 5000; // Durée du spin en millisecondes
    const spinRotations = Math.floor(Math.random() * 5) + 5; // 5 à 10 rotations complètes

    // Générer un numéro aléatoire gagnant entre 0 et 21
    const randomResult = Math.floor(Math.random() * 22); // Choisir le numéro gagnant

    // Calcul de la rotation finale pour arrêter la roue sur le numéro gagnant
    const finalRotation = spinRotations * 360 + (22 - randomResult) * segmentAngle;

    // Appliquer la rotation à la roue
    setWheelRotation(finalRotation);

    // Après la durée du spin, afficher le résultat
    setTimeout(() => {
      setResult(randomResult);
    }, spinDuration);

    // Appeler la fonction `onSpinComplete` après un délai pour réinitialiser le spin
    setTimeout(() => {
      onSpinComplete(randomResult);
    }, spinDuration + 1000); // Le temps pour afficher le résultat avant la réinitialisation
  }, [onSpinComplete, segmentAngle]); // Ajout de `segmentAngle` dans les dépendances

  useEffect(() => {
    if (spinning) {
      // Si le bouton de spin est activé, lancer la fonction pour tourner la roue
      spinWheel();
    } else {
      // Si le spin est terminé, réinitialiser l'état
      setWheelRotation(0);
      setResult(null);
    }
  }, [spinning, spinWheel]);

  return (
    
    <div className="relative w-[400px] h-[400px] mb-2">
      {/* Roue qui tourne */}
      <motion.div 
        className="absolute inset-0 rounded-full border-8 border-yellow-600 bg-yellow-400 overflow-hidden"
        animate={{ rotate: wheelRotation }}
        transition={{ duration: 5, ease: "easeOut" }} // Transition fluide de la rotation
      >
        {numbers.map((number, index) => {
          // Calculer l'angle pour positionner chaque numéro sur la roue
          const angle = (index * 360) / numbers.length;
          return (
            <div
              key={number}
              className="absolute inset-0"
              style={{
                transform: `rotate(${angle}deg)`, // Positionner chaque numéro
              }}
            >
              <div className="absolute top-0 left-1/2 h-1/2 w-2 bg-yellow-600 transform -translate-x-1/2"></div>
              <div className="absolute top-4 left-1/2 h-9 w-9 bg-yellow-200 transform -translate-x-1/2 rotate-45"></div>
              <div className={`absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${getColor(number)} flex items-center justify-center font-bold text-lg`}>
                {number} {/* Affichage des numéros */}
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
          Numero Gagnant: {result} {/* Affichage du numéro gagnant */}
        </div>
      )}
    </div>
  );
};

export default RouletteWheel;
