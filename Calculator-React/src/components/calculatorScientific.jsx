import { Button } from "../components/button";

export function CalculatorScientific({ buttons, updateScreen, mode }) {
  return (
    <div className={`buttons-Scientific ${mode === "Scientific" ? "scientific-mode" : ""}`}>
      <Button operator={buttons.degrees.operator} action={updateScreen} />
      <Button operator={buttons.radians.operator} action={updateScreen} />
      <Button operator={buttons.e.operator} action={updateScreen} />
      <Button operator={buttons.pi.operator} action={updateScreen} />
      <Button operator={buttons.ans.operator} action={updateScreen} />
      <Button operator={buttons.parenthesesClose.operator} action={updateScreen} />
      <Button icon={buttons.parenthesesOpen.icon} operator={buttons.parenthesesOpen.operator} action={updateScreen} />
      <Button icon={buttons.squareRoot.icon} operator={buttons.squareRoot.operator} action={updateScreen} />
      <Button icon={buttons.logarithmE.icon} operator={buttons.logarithmE.operator} action={updateScreen} />
      <Button icon={buttons.logarithm10.icon} operator={buttons.logarithm10.operator} action={updateScreen} />
      <Button icon={buttons.cos.icon} operator={buttons.cos.operator} action={updateScreen} />
      <Button icon={buttons.sin.icon} operator={buttons.sin.operator} action={updateScreen} />
      <Button icon={buttons.tan.icon} operator={buttons.tan.operator} action={updateScreen} />
      <Button icon={buttons.factorial.icon} operator={buttons.factorial.operator} action={updateScreen} />
      <Button icon={buttons.exponent.icon} operator={buttons.exponent.operator} action={updateScreen} />
    </div>
  );
}
