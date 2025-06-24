import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export function Bubbles({ quantity }) {
  const [parameters, setParameters] = useState(() =>
    Array.from({ length: quantity ?? 2 }, () => createBubbleParams())
  );
  const completedCount = useRef(0);

  function createBubbleParams() {
    return {
      left: Math.random() * 90,
      top: Math.random() * 90,
      size: 2 + Math.random() * 4,
      delay: Math.floor(Math.random() * 2) + 1,
    };
  }

  function Bubble({ parameters, onComplete }) {
    return (
      <motion.div
        style={{
          position: 'absolute',
          left: `${parameters.left}vw`,
          top: `${parameters.top}vh`,
          width: `${parameters.size}vw`,
          height: `${parameters.size}vw`,
          borderRadius: '50%',
          background: 'radial-gradient(#FFFFFF, #6DD5FA, #2980B9)',
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1, 1.2, 1, 0.5],
        }}
        transition={{
          duration: 2 + parameters.delay,
          ease: 'easeIn',
          delay: parameters.delay,
        }}
        onAnimationComplete={onComplete}
      />
    );
  }

  function handleAnimationComplete() {
    completedCount.current += 1;

    if (completedCount.current >= parameters.length) {

      completedCount.current = 0;


      const newQuantity = Math.floor(Math.random() * 2) + 7;

      setParameters(Array.from({ length: newQuantity }, () => createBubbleParams()));
    }
  }

  return (
    <>
      {parameters.map((param, i) => (
        <Bubble key={i} parameters={param} onComplete={handleAnimationComplete} />
      ))}
    </>
  );
}
