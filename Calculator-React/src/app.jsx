import { useState, useEffect } from "react";
import { acos, evaluate } from "mathjs";
import "./css/app.css"
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
    },
    logarithm10: {
      operator: 'log()',
      icon: 'log',
    },
    logarithmE: {
      operator: 'In()',
      icon: 'In',
    },
    cos: {
      operator: 'cos()',
      icon: 'cos',
    },
    sen: {
      operator: 'sen()',
      icon: 'sen',
    },
    tan: {
      operator: 'tan()',
      icon: 'tan',
    },
    factorial: {
      operator: '!',
      icon: 'x!',
    },
    exponent: {
      operator: '^()',
      icon: '^',
    },
    //buttons with additional functions
    parenthesesOpen: {
      operator: '()',
      icon: '(',
      action: IncreaseParentheses ,
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

  function deleteCharScreen() {
    setExpression((prev) => {

      if (/\(\)/.test(prev)) {
        setOpen((prevOpen) => prevOpen - 1);
        return prev.replace(/\(\)/g, "");
      }




      if (prev[prev.length - 1] === ')') {
        const match = prev.match(/(\)+)$/);
        const count = match ? match[0].length : 0;

        if (count > 1) {
          setOpen((prevOpen) => prevOpen + 1);
        }
        else {
          setOpen((prevOpen) => Math.max(0, prevOpen - 1));
        }

        setOpen((prevOpen) => count > 1 ? prevOpen + 1 : Math.max(0, prevOpen - 1));



        return prev.slice(0, -2) + prev.slice(-1);
      }

      return prev.slice(0, -1);
    });
  }

  function updateScreenFromHistory(value) {
    clearScreen();
    setExpression(value);
  }
function IncreaseParentheses() {
  setOpen(prev => prev + 1);
}

function DecreaseParentheses() {
  setOpen(prev => Math.max(0, prev - 1)); 
}





  function updateScreen(value) {
    setExpression((prev) => {
      switch (true) {
        case result !== 0: //Start a new operation keeping the last result
          setResult(0);
          return ans + value;
  
        case value === ')': //Only update the parentheses counter
          return prev;
  
        case open > 0: //Determine the position of the entry based on the parentheses
          return prev.slice(0, -open) + value + prev.slice(-open);
  
        default: 
          return prev + value;
      }
    });
  }


  function parseEvaluate(value) {
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
      updateScreen('=');
      setResult(
        evaluate(parseEvaluate(expression))
      );
      setHistory([...history, expression]);
    } catch {
      setResult('Syntax Error');
    }
  }

  function changeMode(value) {
    setMode(value);
  }

  useEffect(() => {
    if (result !== 0 && result !== 'SyntaxError') {
      setAns(result);
    }
  }, [result]);

  return (
    <>
      <section>
        <Screen updateScreenFromHistory={updateScreenFromHistory} history={history} expression={expression} result={result} ans={ans} changeMode={changeMode} mode={mode} />
        <div className="buttons-container">
          <CalculatorBasic buttons={buttons} updateScreen={updateScreen} />
          <CalculatorScientific buttons={buttons} updateScreen={updateScreen} mode={mode} />
        </div>
      </section>
    </>
  )

}