import type { ReactElement } from "react";
import ShadowWrapper from "../ShadowWrapper.js";
import type { ExampleComponentProps } from "../types.js";
import useConfig from "../useConfig.js";
import css from "./styles.css?raw";

const Button = ({
  className,
  id,
  styles,
}: ExampleComponentProps): ReactElement => {
  const config = useConfig();

  return (
    <ShadowWrapper style={{ ...styles, ...config.styles }}>
      <style>{css}</style>
      <div
        id={id}
        className={["ds", "example", "button", className]
          .filter(Boolean)
          .join(" ")}
      >
        <button onClick={() => alert("I'm a button!")} type={"button"}>
          Click me
        </button>
      </div>
    </ShadowWrapper>
  );
};

export default Button;
