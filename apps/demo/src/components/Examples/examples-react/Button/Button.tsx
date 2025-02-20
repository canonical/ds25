import type { ReactElement } from "react";
import "./styles.css";
import type { ExampleComponentProps } from "../types.js";

const Button = ({
  className,
  id,
  styles,
}: ExampleComponentProps): ReactElement => {
  return (
    <div
      id={id}
      style={styles}
      className={["ds", "example", "button", className]
        .filter(Boolean)
        .join(" ")}
    >
      <button onClick={() => alert("I'm a button!")} type={"button"}>
        Click me
      </button>
    </div>
  );
};

export default Button;
