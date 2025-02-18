import "./screen.css"
import { CalculatorMode } from "./calculatorMode"
export function Screen({expression,result,ans}){

let displayUp=result;
let displayDown=expression;

if (result==='') {
  displayUp='Ans= ' + ans;
 displayDown=expression;
} else if (result!='') {
  displayUp=expression;
 displayDown=result;
}
 
    return(
      
      <>
      
      <h2>
          <span> {displayUp} <br/></span>
      <span> {displayDown}</span>
      
        </h2> 
      </>
        
    )


     /*
   <div className="ct-screen">
         <Screen className="ct-screen-up" text={result ? expression : null} />
         <Screen className="ct-screen-down" text={result ? result : expression} />
       </div>
   */
}