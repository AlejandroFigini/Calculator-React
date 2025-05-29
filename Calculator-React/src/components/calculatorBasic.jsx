import { Button } from "./button";

export function CalculatorBasic({ basicButtons, scientificButtons, mode }) {
  return (
    <>
      <div className="buttons-Basic">
        {basicButtons.map((btn) => (
          <Button
            key={btn.icon}
            icon={btn.icon}
            operator={btn.operator}
             action={btn.action }
          />
        ))}
      </div>

      <div className={`buttons-Scientific ${mode === "Scientific" ? "scientific-mode" : ""}`}>
        {scientificButtons.map((btn) => (
          <Button key={btn.icon}
            icon={btn.icon}
            operator={btn.operator}
             action={btn.action}
          />
        ))}
      </div>
    </>
  );
}
