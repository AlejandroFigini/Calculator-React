import "../css/screen.css";
import { motion } from "framer-motion";

import { History } from "../components/history";
import { CalculatorMode } from "../components/calculatorMode";
import { BlinkingCurson } from "../components/blinkingcursor";

export function Screen({ expression, result, ans, changeMode, mode }) {

  let displayUp = result === '' ? 'ans= ' + ans : result;
  let displayDown = expression;

  const animations = {
    initialUp: {
      transform: "translateY(0%)",
      color: "#999da9",
      fontSize: '1vw',  // Tamaño inicial pequeño
    },
    initialDown: {
      transform: "translateY(0%)",
      color: "#ececec",
      fontSize: '1.5vw', // Tamaño inicial más grande
    },
    moveUp: {
      transform: "translateY(-100%)",
      color: "#999da9",
      fontSize: '1vw',  // Tamaño final
    },
    moveDown: {
      transform: "translateY(100%)",
      color: "#ececec",
      fontSize: '1.5vw', // Tamaño final
    },
  };

  return (
    <div className="calculator-screen">
      <CalculatorMode changeMode={changeMode} mode={mode} />
      <History />
      <h2>
        {/* Aquí usas "variants" directamente en el motion.span */}
        <motion.span
          variants={animations}
          initial="initialUp"
          animate={result != '' ? 'moveDown' :'initialUp' }
          transition={{ duration: 0.3, ease: "easeOut" }} // Transición más suave
        >
          {displayUp}
        </motion.span>

        {/* Aquí también se usa "variants" y animación basada en el resultado */}
        <motion.span
          variants={animations}
          initial="initialDown"
          animate={result != '' ? 'moveUp' : 'initialDown'}
          transition={{ duration: 0.3, ease: "easeOut" }} // Transición más suave
        >
          {displayDown}
          <BlinkingCurson />

        </motion.span>
      </h2>
    </div>
  );
}
