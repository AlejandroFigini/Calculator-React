import { Button } from "./button";

export function CalculatorBasic({ buttons, updateScreen }) {
  return (
    <div className={`buttons-Basic`}>
      <Button icon={"9"} operator={"9"} action={updateScreen} />
      <Button icon={"8"} operator={"8"} action={updateScreen} />
      <Button icon={"7"} operator={"7"} action={updateScreen} />
      <Button icon={"6"} operator={"6"} action={updateScreen} />
      <Button icon={"5"} operator={"5"} action={updateScreen} />
      <Button icon={"4"} operator={"4"} action={updateScreen} />
      <Button icon={"3"} operator={"3"} action={updateScreen} />
      <Button icon={"2"} operator={"2"} action={updateScreen} />
      <Button icon={"1"} operator={"1"} action={updateScreen} />
      <Button icon={"0"} operator={"0"} action={updateScreen} />
      <Button icon={"."} operator={"."} action={updateScreen} />
      <Button operator={buttons.subtraction.operator} action={updateScreen} />
      <Button operator={buttons.addition.operator} action={updateScreen} />
      <Button operator={buttons.multiplication.operator} action={updateScreen} />
      <Button operator={buttons.divide.operator} action={updateScreen} />
      <Button operator={buttons.percentage.operator} action={updateScreen} />
      <Button operator={buttons.clear.operator} action={buttons.clear.action} />
      <Button operator={buttons.delete.operator} action={buttons.delete.action} />
      <Button operator={buttons.equal.operator} action={buttons.equal.action} />
    </div>
  );
}
