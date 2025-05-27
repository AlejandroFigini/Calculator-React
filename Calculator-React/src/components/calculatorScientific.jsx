import { Button } from "../components/button";

export function CalculatorScientific({ buttons, updateScreen, mode }) {
  return (
    <div className={`buttons-Scientific ${mode === "Scientific" ? "scientific-mode" : ""}`}>
      <Button operator={buttons.degrees.operator} action={updateScreen} />
      <Button operator={buttons.radians.operator} action={updateScreen} />
      <Button operator={buttons.e.operator} action={updateScreen} />
      <Button operator={buttons.pi.operator} action={updateScreen} />
      <Button operator={buttons.ans.operator} action={updateScreen} />
      <Button operator={buttons.parenthesesClose.operator} action={buttons.parenthesesClose.action} />
      <Button icon={buttons.parenthesesOpen.icon} operator={buttons.parenthesesOpen.operator} action={(op)=>{buttons.parenthesesOpen.action();updateScreen(op)}} />
      <Button icon={buttons.squareRoot.icon} operator={buttons.squareRoot.operator} action={(op)=>{buttons.squareRoot.action();updateScreen(op)}} />
      <Button icon={buttons.logarithmE.icon} operator={buttons.logarithmE.operator} action={(op)=>{buttons.logarithmE.action();updateScreen(op)}} />
      <Button icon={buttons.logarithm10.icon} operator={buttons.logarithm10.operator} action={(op)=>{buttons.logarithm10.action();updateScreen(op)}} />
      <Button icon={buttons.cos.icon} operator={buttons.cos.operator} action={(op)=>{buttons.cos.action();updateScreen(op)}} />
      <Button icon={buttons.sen.icon} operator={buttons.sen.operator} action={(op)=>{buttons.sen.action();updateScreen(op)}} />
      <Button icon={buttons.tan.icon} operator={buttons.tan.operator} action={(op)=>{buttons.tan.action();updateScreen(op)}} />
      <Button icon={buttons.factorial.icon} operator={buttons.factorial.operator} action={(op)=>{buttons.factorial.action();updateScreen(op)}} />
      <Button icon={buttons.exponent.icon} operator={buttons.exponent.operator} action={(op)=>{buttons.exponent.action();updateScreen(op)}} />
    </div>
  );
}
