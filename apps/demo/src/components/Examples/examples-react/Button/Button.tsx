import {ReactElement, useEffect} from "react";
import "./styles.css";
import type {ExampleComponentProps} from "../types.js";
import useConfig from "../useEvent.js";
import root from 'react-shadow';

const Button = ({
                  className,
                  id,
                  styles,
                }: ExampleComponentProps): ReactElement => {

  const config = useConfig();

  return (
    <root.div style={{...styles, ...config.styles}}>
      <div
        id={id}
        className={["ds", "example", className].filter(Boolean).join(" ")}
      >
        <button onClick={() => alert("I'm a button!")} type={"button"}>
          Click me
        </button>
        {JSON.stringify(config)}
      </div>
    </root.div>
  );
};

export default Button;
