import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./css/app.css";

//Components
import { Screen } from "./components/screen";
import { CalculatorBasic } from "./components/calculatorBasic";

export function App() {

  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);
  const [ans, setAns] = useState(0);
  const [open, setOpen] = useState(0); //counter open parentheses
  const [mode, setMode] = useState('Standar');
  const [history, setHistory] = useState([]);
const buttons = {
  basic: [
    { icon: '1' },
    { icon: '2' },
    { icon: '3' },
    { icon: '4' },
    { icon: '5' },
    { icon: '6' },
    { icon: '7' },
    { icon: '8' },
    { icon: '9' },
    { icon: '0' },
    { icon: '.' },
    { icon: '%' },
    { icon: '+' },
    { icon: '-' },
    { icon: '÷' },
    { icon: 'x' },
    { icon: 'C', action: clearScreen },
    { icon: '←', action: deleteCharScreen },
    { icon: '=', action: calculateResult }
  ],
  scientific: [
    { icon: 'e' },
    { icon: 'Ans' },
    { icon: 'π' },
    { icon: '√', operator: '√()', action: IncreaseParentheses },
    { icon: 'log', operator: 'log()', action: IncreaseParentheses },
    { icon: 'In', operator: 'In()', action: IncreaseParentheses },
    { icon: 'cos', operator: 'cos()', action: IncreaseParentheses },
    { icon: 'sen', operator: 'sen()', action: IncreaseParentheses },
    { icon: 'tan', operator: 'tan()', action: IncreaseParentheses },
    { icon: 'x!', operator: '!' },
    { icon: '^', operator: '^()', action: IncreaseParentheses },
    { icon: '(', operator: '()', action: IncreaseParentheses },
    { icon: ')', action: DecreaseParentheses }
  ]
};

  //Button functions
  function clearScreen() {
    setExpression('');
    setResult(0);
    setOpen(0);
  }

  function IncreaseParentheses(value) {
    updateScreen(value);
    setOpen(prev => prev + 1);
  }

  function DecreaseParentheses() {
    setOpen(prev => Math.max(0, prev - 1));
  }

  function updateScreen(value) {
    console.log(value);
    setExpression((prev) => {
      switch (true) {
        case value === "=": //always show = in the end of the expression
          setOpen(0);
          return prev + value;  

        case result !== 0: //Start a new operation keeping the last result
          setResult(0);
          setOpen(0);
          return ans + value;

        case value === ')': //Only update the parentheses counter
          return prev;
             
        case open > 0: //Determine the position of the input based on the parentheses
          return prev.slice(0, -open) + value + prev.slice(-open);

        default:
          console.log(open);
          return prev + value;
      }
    });
  }

  function deleteCharScreen() {
    setExpression((prev) => {
      // Case 1: delete empty parentheses  
      if (prev.includes("()")) {
        setOpen((prevOpen) => prevOpen - 1);
        return prev.replace(/\(\)/g, "");
      }

      // Case 2: delete character keeping parentheses 
      const match = prev.match(/(\)+)$/);
      if (match) {       
        setOpen( match[0].length );
        const count = match[0].length;
        return prev.slice(0, -count - 1) + prev.slice(-count);
      }

      // Case 3: normal delete
      return prev.slice(0, -1);
    });
  }

  function parseExpression(value) {
    return value.replaceAll("x", "*")
      .replaceAll("÷", "/")
      .replaceAll("√", "sqrt")
      .replaceAll("π", "pi")
      .replaceAll("Ans", ans)
      .replaceAll("In", 'log')
      .replaceAll("log", 'log10');
  }

  function calculateResult() {
    try {
      const result = evaluate(parseExpression(expression));

      setResult(result);
      setHistory(prev => [...prev, expression]); // add expression to history
      updateScreen("=");
    } catch {
      setResult('Syntax Error');
    }
  }

  function updateScreenFromHistory(value) {
    clearScreen();
    setExpression(value);
  }

  function changeMode(value) {
    setMode(value);
  }

  // update ans value if the result is correct
  useEffect(() => {
    if (![0, 'Syntax Error'].includes(result)) {
      setAns(result);
    }
  }, [result]);

  return (
    <>
      <section>
        <Screen updateScreenFromHistory={updateScreenFromHistory} history={history} expression={expression} result={result} ans={ans} changeMode={changeMode} mode={mode} open={open}/>
        <div className="buttons-container">
          <CalculatorBasic basicButtons={buttons.basic} scientificButtons={buttons.scientific} updateScreen={updateScreen} mode={mode}/>
        </div>
      </section>
    </>
  )
}