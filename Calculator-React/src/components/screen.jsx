import "../css/screen.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { History } from "../components/history";
import { CalculatorMode } from "../components/calculatorMode";
import { BlinkingCurson } from "../components/blinkingcursor";

export function Screen({ expression, result, ans, changeMode, mode,history,updateScreenFromHistory, open }) {

  let displayUp = result === 0 ? 'ans= ' + ans : result;
  const [displayDown, setdisplayDown] = useState(expression);

  const animations = {
    initialUp: {
      transform: "translateY(0%)",
      color: "#999da9",
      fontSize: '1vw',  
    },
    initialDown: {
      transform: "translateY(0%)",
      color: "#ececec",
      fontSize: '1.5vw', 
    },
    moveUp: {
      transform: "translateY(-100%)",
      color: "#999da9",
      fontSize: '1vw',  
    },
    moveDown: {
      transform: "translateY(100%)",
      color: "#ececec",
      fontSize: '1.5vw', 
    },
  };
 
useEffect(() => {
  if (open > 0 ) {
    const index = expression.length - open;
    setdisplayDown(
      <>
        {expression.slice(0, index)}
        <span style={{ color: "#ff6666" }}>{expression.slice(index)}</span>
      </>
    );
  } else {
    setdisplayDown(expression);
  }
}, [expression, open]);


  return (
    <div className="calculator-screen">
      <CalculatorMode changeMode={changeMode} mode={mode} />
      <History updateScreenFromHistory={updateScreenFromHistory}  history={history} />
      <h2>
        <motion.span
          variants={animations}
          initial="initialUp"
          animate={result !== 0 ? 'moveDown' :'initialUp' }
          transition={{ duration: 0.3, ease: "easeOut" }} 
        >
          {displayUp}
        </motion.span>
        <motion.span
          variants={animations}
          initial="initialDown"
          animate={result !== 0 ? 'moveUp' : 'initialDown'}
          transition={{ duration: 0.3, ease: "easeOut" }} 
        >
          {displayDown}
          <BlinkingCurson result={result} />
        </motion.span>
      </h2>
    </div>
  );
}


