import { useConfig } from "../../contexts/ExampleContext/ExampleContext.js";
import type { ExampleRendererProps } from "./types.js";

const componentCssClassname = "ds example-renderer";
import root from "react-shadow";

import shadowCss from "./shadow-styles.css?raw";

const ExampleRenderer = ({ style, className }: ExampleRendererProps) => {
  const { activeExampleConfig } = useConfig();
  return (
    <div
      style={style}
      className={[componentCssClassname, className].filter(Boolean).join(" ")}
    >
      {activeExampleConfig?.component && (
        <>
          <h3>{activeExampleConfig.name}</h3>
          <root.div style={activeExampleConfig.cssVars} mode={"closed"}>
            <style>{shadowCss}</style>
            <div className="ds shadow-container">
              <activeExampleConfig.component />
            </div>
          </root.div>
        </>
      )}
    </div>
  );
};

export default ExampleRenderer;
