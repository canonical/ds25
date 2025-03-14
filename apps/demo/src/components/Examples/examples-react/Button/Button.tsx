import { ReactElement, useEffect, useState } from "react";
import cssUrl from "./styles.css?url";
import type { ExampleComponentProps } from "../types.js";
import useConfig from "../useEvent.js";
import root from "react-shadow";

async function loadStylesheet(url) {
  const response = await fetch(url);
  const cssText = await response.text();
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  return sheet;
}

const Button = ({ className, id, styles }: ExampleComponentProps): ReactElement => {
  const config = useConfig();
  const [cssSheet, setCssSheet] = useState<CSSStyleSheet | null>(null);

  useEffect(() => {
    let isMounted = true;
    loadStylesheet(cssUrl).then((sheet) => {
      if (isMounted) {
        setCssSheet(sheet);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  console.log({ cssUrl });

  return (
    <root.div style={{ ...styles, ...config.styles }} styleSheets={cssSheet ? [cssSheet] : []} mode={"closed"}>
      <div id={id} className={["ds", "example", className].filter(Boolean).join(" ")}>
        <button onClick={() => alert("I'm a button!")} type="button">
          Click me
        </button>
        {JSON.stringify(config)}
      </div>
    </root.div>
  );
};

export default Button;
