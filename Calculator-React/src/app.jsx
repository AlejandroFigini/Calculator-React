import "./app.css"
import { Button } from "./button"
import { Screen } from "./screen"
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { CalculatorMode } from "./calculatorMode"

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

    logarithm: {
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
    ans: {
      operator: 'Ans',
    },

    clear: {
      icon: 'C',
      acction: clearScreen,
    },

    delete: {
      icon: '←',
      acction: deletetCharScreen,
    },

    equal: {
      icon: '=',
      acction: calculateResult,
    }
  }

  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('');
  const [ans, setAns] = useState(0);
  const [open, setOpen] = useState(0); //counter open parentheses

  //Button functions
  function clearScreen() {
    setExpression('');
    setResult('');
    setOpen(0);
  }

  function deletetCharScreen() {
    setExpression((prev) => {
      const index = prev.indexOf(")");

      // Eliminamos `()` si existen y restamos 1 a `open`
      if (/\(\)/.test(prev)) {
        setOpen((prevOpen) => prevOpen - 1);
        return prev.replace(/\(\)/g, "");
      }

      // Si hay `)` pero NO `()`, eliminamos un carácter usando `open`
      if (index !== -1) {
        const openmalo = -open; // open debería estar definido en el estado
        return prev.slice(0, openmalo - 1) + prev.slice(openmalo);
      }

      // Si no hay `)` ni `()`, eliminamos el último carácter
      return prev.slice(0, -1);
    });
  }

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

  useEffect(() => {
    if (result !== '' && result !== 'SyntaxError') {
      setAns(result);
    }
  }, [result]);



  const [mode, setMode] = useState('Standar')

  function changeMode(value) {
    setMode(value);
  }






  return (
    <>
      <section>
     
        <div className="calculator-screen">
        <CalculatorMode changeMode={changeMode} mode={mode} />
          <Screen className="ct-screen-down" expression={expression} result={result} ans={ans} />
        </div>
        <div className="calculator-buttons">

          <div className={`calculator-buttons-scientific ${mode=="Scientific"?"scientific-mode":""}`}>


            <Button icon={buttons.parenthesesOpen.icon} operator={buttons.parenthesesOpen.operator} action={updateScreen} />
            <Button operator={buttons.parenthesesClose.operator} action={updateScreen} />
            <Button icon={buttons.squareRoot.icon} operator={buttons.squareRoot.operator} action={updateScreen} />
            <Button icon={buttons.logarithm.icon} operator={buttons.logarithm.operator} action={updateScreen} />
            <Button icon={buttons.cos.icon} operator={buttons.cos.operator} action={updateScreen} />
            <Button icon={buttons.sen.icon} operator={buttons.sen.operator} action={updateScreen} />



            <Button icon={buttons.tan.icon} operator={buttons.tan.operator} action={updateScreen} />
            <Button operator={buttons.e.operator} action={updateScreen} />
            <Button icon={buttons.parenthesesOpen.icon} operator={buttons.parenthesesOpen.operator} action={updateScreen} />
            <Button operator={buttons.parenthesesClose.operator} action={updateScreen} />
            <Button icon={buttons.squareRoot.icon} operator={buttons.squareRoot.operator} action={updateScreen} />
            <Button icon={buttons.logarithm.icon} operator={buttons.logarithm.operator} action={updateScreen} />
            <Button icon={buttons.cos.icon} operator={buttons.cos.operator} action={updateScreen} />
            <Button icon={buttons.sen.icon} operator={buttons.sen.operator} action={updateScreen} />



            <Button icon={buttons.tan.icon} operator={buttons.tan.operator} action={updateScreen} />
            <Button operator={buttons.e.operator} action={updateScreen} />
            <Button operator={buttons.pi.operator} action={updateScreen} />
            <Button operator={buttons.ans.operator} action={updateScreen} />
            <Button icon={buttons.factorial.icon} operator={buttons.factorial.operator} action={updateScreen} />
            <Button icon={buttons.exponent.icon} operator={buttons.exponent.operator} action={updateScreen} />

          </div>
          <div className={`calculator-buttons-basic`} >
            <Button icon={"7"} operator={"7"} action={updateScreen} />
            <Button icon={"8"} operator={"8"} action={updateScreen} />
            <Button icon={"9"} operator={"9"} action={updateScreen} />
            <Button operator={buttons.addition.operator} action={updateScreen} />

            <Button icon={"4"} operator={"4"} action={updateScreen} />

            <Button icon={"5"} operator={"5"} action={updateScreen} />
            <Button icon={"6"} operator={"6"} action={updateScreen} />
            <Button operator={buttons.subtraction.operator} action={updateScreen} />


            <Button icon={"1"} operator={"1"} action={updateScreen} />
            <Button icon={"2"} operator={"2"} action={updateScreen} />
            <Button icon={"3"} operator={"3"} action={updateScreen} />
            <Button operator={buttons.multiplication.operator} action={updateScreen} />

            <Button icon={"."} operator={"."} action={updateScreen} />

            <Button icon={"0"} operator={"0"} action={updateScreen} />
            <Button icon={buttons.equal.icon} action={buttons.equal.acction} />
            <Button icon={buttons.clear.icon} action={buttons.clear.acction} />
            <Button icon={buttons.delete.icon} action={buttons.delete.acction} />
            <Button operator={buttons.percentage.operator} action={updateScreen} />
            <Button operator={buttons.divide.operator} action={updateScreen} />
          </div>

        </div>

      </section>
    </>
  )
}


/*

 */