
import "./app.css"
import { Button } from "./button"
import { Screen } from "./screen"
import { useState } from "react";
import { evaluate } from "mathjs";
import { faXmark, faPlus, faDivide, faEquals, faSquareRootVariable, faDeleteLeft, faTrash, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, fa0, faMinus, faCircle, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { icon } from "@fortawesome/fontawesome-svg-core";

export function App() {

  const buttons = {

    subtraction: {
      operator: '-',
    },

    divide: {
      operator: '/',
      icon: '÷',
    },

    multiplication: {
      operator: '*',
      icon: 'X',
    },

    addition: {
      operator: '+',
    },
    squareRoot: {
      operator: 'sqrt()',
      icon: '√',
    },
    logarithm: {
      operator: 'log()',
      icon: 'log',
    },
    ln: {
      operator: 'ln()',
      icon: 'ln',
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
    e: {
      operator: 'e',
    },

    percentage: {
      operator: '%',
    },
    pi: {
      operator: 'pi',
      icon: 'π',
    },
    factorial: {
      operator: '!',
      icon: 'x!',
    },
    ans: {
      operator: 'Ans',
    },
    exponent: {
      operator: '^()',
      icon: '^',
    },
    parenthesesOpen: {
      operator: '()',
      icon: '(',
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

    clear: {
      operator: 'C',
      acction: function clearScreen() {
        setExpression('');
        setResult('');
        setOpen(0);
      },
    },


    delete: {
      operator: '←',
      acction: function deletetCharScreenn() {
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
      },
    },
    equal: {
      operator: '=',
      icon: faEquals,
      acction: function result() {
        setResult(evaluate(expression).toString());
      },
    },

  }

  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [open, setOpen] = useState(0);

  function updateScreen(value) {
    setExpression((prev) => {

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


  return (
    <>
      <section>
        <div className="ct-screen">
          <Screen className="ct-screen-up" text={expression} />
          <Screen className="ct-screen-down" text={result} />
        </div>
        <div className="ct-buttons-number">
          <Button button={"7"} action={updateScreen} />
          <Button button={"8"} action={updateScreen} />
          <Button button={"9"} action={updateScreen} />
          <Button button={"4"} action={updateScreen} />
          <Button button={"5"} action={updateScreen} />
          <Button button={"6"} action={updateScreen} />
          <Button button={"1"} action={updateScreen} />
          <Button button={"2"} action={updateScreen} />
          <Button button={"3"} action={updateScreen} />
          <Button button={"."} action={updateScreen} />
          <Button button={"0"} action={updateScreen} />
        </div>
        <div className="ct-buttons-operator">

          <Button button={buttons.addition.operator} icon={buttons.addition.icon} action={updateScreen} />
          <Button button={buttons.subtraction.operator} icon={buttons.subtraction.icon} action={updateScreen} />
          <Button button={buttons.multiplication.operator} icon={buttons.multiplication.icon} action={updateScreen} />
          <Button button={buttons.divide.operator} icon={buttons.divide.icon} action={updateScreen} />

          <Button button={buttons.parenthesesOpen.operator} icon={buttons.parenthesesOpen.icon} action={updateScreen} />
          <Button button={buttons.parenthesesClose.operator} icon={buttons.parenthesesClose.icon} action={updateScreen} />
          <Button button={buttons.squareRoot.operator} icon={buttons.squareRoot.icon} action={updateScreen} />
          <Button button={buttons.logarithm.operator} icon={buttons.logarithm.icon} action={updateScreen} />
          <Button button={buttons.cos.operator} icon={buttons.cos.icon} action={updateScreen} />
          <Button button={buttons.sen.operator} icon={buttons.sen.icon} action={updateScreen} />


          <Button button={buttons.tan.operator} icon={buttons.tan.icon} action={updateScreen} />
          <Button button={buttons.e.operator} action={updateScreen} />
          <Button button={buttons.percentage.operator} action={updateScreen} />
          <Button button={buttons.pi.operator} icon={buttons.pi.icon} action={updateScreen} />
          <Button button={buttons.factorial.operator} icon={buttons.factorial.icon} action={updateScreen} />
          <Button button={buttons.exponent.operator} icon={buttons.exponent.icon} action={updateScreen} />
          <Button button={buttons.clear.operator} icon={buttons.clear.icon} action={buttons.clear.acction} />
          <Button button={buttons.delete.operator} icon={buttons.delete.icon} action={buttons.delete.acction} />
          <Button button={buttons.equal.operator} action={buttons.equal.acction} />
        </div>
      </section>
    </>
  )

}
/*

 


       
        
      
        
 
*/

