
import "./app.css"
import { Button } from "./button"
import { Screen } from "./screen"
import { faXmark, faPlus, faDivide, faEquals, faDeleteLeft, faTrash, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, fa0, faMinus, faSquareRootVariable, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export function App() {

  const numbers = [[7, fa7], [8, fa8], [9, fa9], [4, fa4], [5, fa5], [6, fa6], [1, fa1], [2, fa2], [3, fa3], [0, fa0], ['point', faCircle]];
  const operators = [['+', faPlus], ['-', faMinus], ['÷', faDivide], ['x', faXmark], ['√', faSquareRootVariable]];
  const functions = [['←', faDeleteLeft, deletetCharScreen], ['clear', faTrash, clearScreen], ['=', faEquals, operations]];


  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  function updateScreen(value) {
    setExpression((prev) => prev + value);
  }
  function clearScreen() {
    setExpression('');
    setResult('');
  }
  function deletetCharScreen() {
    setExpression((prev) => prev.slice(0, -1))
  }
  function operations() {
    const regex = /(\d+)\s*([\+\-\*/])\s*(\d+)/;
    const match = expression.match(regex);

    if (match) {
      const num1 = parseFloat(match[1]);
      const operator = match[2];
      const num2 = parseFloat(match[3]);
      let res;

      switch (operator) {
        case '+':
          res = num1 + num2;
          break;

        case '-':
          res = num1 - num2;
          break;

        default:
          break;
      }
      setResult(res)
    }
  }
  return (
    <>
      <section>
        <div className="ct-screen">
          <Screen className="ct-screen-up" text={result ? expression : null} />
          <Screen className="ct-screen-down" text={result ? result : expression} />
        </div>
        <div className="ct-buttons-number">
          <Button buttons={numbers} updateScreen={updateScreen} />
        </div>
        <div className="ct-buttons-operator">
          <Button buttons={operators} updateScreen={updateScreen} />
          <Button buttons={functions} />
        </div>
      </section>
    </>
  );
}