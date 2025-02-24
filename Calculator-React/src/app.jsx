import "./css/app.css"
import { useState, useEffect } from "react";
import { evaluate, OperatorNode } from "mathjs";
//Components
import { Screen } from "./components/screen";
import { CalculatorBasic } from "./components/calculatorBasic";
import { CalculatorScientific } from "./components/calculatorScientific";

export function App() {
  /*
  object button:{
      icon= button label,
      operator= operator inside the expression,
      action= specific button function.
  }
  */
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

    parenthesesClose: {
      operator: ')',
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
      operator: 'log()',
      icon: 'log',
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

    parenthesesOpen: {
      operator: '()',
      icon: '(',
    },

    //buttons with additional functions
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

  const [mode, setMode] = useState('Standar')
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [ans, setAns] = useState(0);
  const [open, setOpen] = useState(0); //counter open parentheses

  //Button functions
  function clearScreen() {
    setExpression('');
    setResult('');
    setOpen(0);
  }

  //deletes last character on the screen
  function deleteCharScreen() {
    setExpression((prev) => {
      if (/\(\)/.test(prev)) {  
        setOpen((prevOpen) => prevOpen - 1);
        return prev.replace(/\(\)/g, ""); 
      } 
  
      if (prev[prev.length - 1] === ')') { 
        const match = prev.match(/(\)+)$/);
        const trailingCount = match ? match[0].length : 0;
  
        if (trailingCount > 1) {
          setOpen((prevOpen) => prevOpen + 1);
        } else {
          setOpen((prevOpen) => Math.max(0, prevOpen - 1));
        }
  
        return prev.slice(0, -2) + prev.slice(-1);
      }
  
      return prev.slice(0, -1);
    });
  }
  /*
  function deleteCharScreen() {
  setExpression((prev) => {
    // Caso 1: Si hay paréntesis vacíos "()", se eliminan y se actualiza el contador open.
    if (/\(\)/.test(prev)) {  
      setOpen((prevOpen) => prevOpen - 1);
      return prev.replace(/\(\)/g, "");
    } 

    // Caso 2: Si el último carácter es ')'
    if (prev[prev.length - 1] === ')') {
      // Usamos una expresión regular para contar cuántos ')' consecutivos hay al final.
      const match = prev.match(/(\)+)$/);
      const trailingCount = match ? match[0].length : 0;
      
      // Nos aseguramos de que haya al menos un carácter antes del bloque de ')'
      if (prev.length > trailingCount) {
        // Retornamos la cadena sin el carácter que precede inmediatamente al bloque final de ')'
        return prev.slice(0, prev.length - trailingCount - 1) + prev.slice(prev.length - trailingCount);
      } else {
        return prev; // En caso de que no haya nada antes, se retorna la cadena sin cambios.
      }
    }
    
    // Caso 3: Si no se cumple ningún caso anterior, se elimina el último carácter
    return prev.slice(0, -1);
  });
}

  
  
  */

  function updateScreen(value) {

    setExpression((prev) => {
      if (result !== '') {
        setExpression(result + value); // Usa result para iniciar la nueva expresión
        setResult(''); // Limpia el resultado después de actualizar la expresión
        return; // Evita que el código continúe ejecutándose
      }


      if (value.includes('()')) {
        setOpen(open + 1)
      }
      else if (value == ')') {
        setOpen(prev => Math.max(0, prev - 1))
        return prev
      }
      return open > 0 ? (prev.slice(0, -open) + value + prev.slice(-open)) : (prev + value);

    })

  }

  function parseEvaluate(value) {
    return value.replaceAll("x", "*")
      .replaceAll("÷", "/")
      .replaceAll("√", "sqrt")
      .replaceAll("π", "pi")
      .replaceAll("Ans", ans);
  }

  function calculateResult() {
    try {
      updateScreen('=')
      setResult(
        evaluate(parseEvaluate(expression))
      );

    } catch {
      setResult('SyntaxError');
    }
  }

  function changeMode(value) {
    setMode(value);
  }

  useEffect(() => {
    if (result !== '' && result !== 'SyntaxError') {
      setAns(result);
    }
  }, [result]);

  return (
    <>
      <section>
        <Screen expression={expression} result={result} ans={ans} changeMode={changeMode} mode={mode} />
        <div className="buttons-container">
          <CalculatorBasic buttons={buttons} updateScreen={updateScreen} />
          <CalculatorScientific buttons={buttons} updateScreen={updateScreen} mode={mode} />
        </div>

      </section>
    </>
  )
}


/*        
*/
