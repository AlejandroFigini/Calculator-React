import "../css/screen.css"

import { History } from "../components/history";
import { CalculatorMode } from "../components/calculatorMode";

import { BlinkingCurson } from "../components/blinkingcursor"


export function Screen({ expression, result, ans, changeMode, mode }) {

  let displayUp = result;
  let displayDown = expression;

  if (result === '') {
    displayUp = 'Ans= ' + ans;
    displayDown = expression;
  } else if (result != '') {
    displayUp = expression;
    displayDown = result;
  }

  return (
    <>
      <div className="calculator-screen">
        <CalculatorMode changeMode={changeMode} mode={mode} />
        <History />
        <h2>
          <span> {displayUp}</span>
          <span> {displayDown}<BlinkingCurson /></span>
        </h2>
      </div>
    </>
  )
}