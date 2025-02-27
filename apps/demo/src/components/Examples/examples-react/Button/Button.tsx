import type { ReactElement } from "react";
import ExampleWrapper from "../ExampleWrapper.js";
import type { ExampleComponentProps } from "../types.js";
import useConfig from "../useConfig.js";
import cssRaw from "./styles.css?raw";

const Button = ({ initialConfig }: ExampleComponentProps): ReactElement => {
  console.log({initialConfig})

  const config = useConfig(initialConfig);

  return (
    <ExampleWrapper cssRaw={cssRaw} config={config}>
      <div className="ds example button">
        <button onClick={() => alert("I'm a button!")} type={"button"}>
          Click me
        </button>
      </div>
    </ExampleWrapper>
  );
};

export default Button;
