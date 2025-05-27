import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./css/app.css";

//Components
import { Screen } from "./components/screen";
import { CalculatorBasic } from "./components/calculatorBasic";
import { CalculatorScientific } from "./components/calculatorScientific";

export function App() {

  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);
  const [ans, setAns] = useState(0);
  const [open, setOpen] = useState(0); //counter open parentheses
  const [mode, setMode] = useState('Standar');
  const [history, setHistory] = useState([]);
  const buttons = {
    //Buttons without icons
    e: {
      operator: 'e',
    },
    ans: {
      operator: 'Ans',
    },
    percentage: {
      operator: '%',
    },
    degrees: {
      operator: 'Deg',
    },
    radians: {
      operator: 'Rad',
    },
    addition: {
      operator: '+',
    },
    subtraction: {
      operator: '-',
    },
    divide: {
      operator: '÷',
    },
    multiplication: {
      operator: 'x',
    },
    pi: {
      operator: 'π',
    },

    //Buttons with icons
    squareRoot: {
      operator: '√()',
      icon: '√',
      action: IncreaseParentheses,
    },
    logarithm10: {
      operator: 'log()',
      icon: 'log',
      action: IncreaseParentheses,
    },
    logarithmE: {
      operator: 'In()',
      icon: 'In',
      action: IncreaseParentheses,
    },
    cos: {
      operator: 'cos()',
      icon: 'cos',
      action: IncreaseParentheses,
    },
    sen: {
      operator: 'sen()',
      icon: 'sen',
      action: IncreaseParentheses,
    },
    tan: {
      operator: 'tan()',
      icon: 'tan',
      action: IncreaseParentheses,
    },
    factorial: {
      operator: '!',
      icon: 'x!',
      action: IncreaseParentheses,
    },
    exponent: {
      operator: '^()',
      icon: '^',
      action: IncreaseParentheses,
    },
    //buttons with additional functions
    parenthesesOpen: {
      operator: '()',
      icon: '(',
      action: IncreaseParentheses,
    },
    parenthesesClose: {
      operator: ')',
      action: DecreaseParentheses,
    },
    clear: {
      operator: 'C',
      action: clearScreen,
    },
    delete: {
      operator: '←',
      action: deleteCharScreen,
    },
    equal: {
      operator: '=',
      action: calculateResult,
    }
  }

  //Button functions
  function clearScreen() {
    setExpression('');
    setResult(0);
    setOpen(0);
  }

  function IncreaseParentheses() {
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
          <CalculatorBasic buttons={buttons} updateScreen={updateScreen} />
          <CalculatorScientific buttons={buttons} updateScreen={updateScreen} mode={mode} />
        </div>
      </section>
    </>
  )
}