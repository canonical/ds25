import type { ReactElement, ReactNode } from "react";
import root from "react-shadow";
import type { BaseExampleSettings } from "../ExampleControls/index.js";

const ExampleWrapper = ({
  cssRaw,
  children,
  config,
}: {
  cssRaw?: string;
  children: ReactNode;
  config: BaseExampleSettings;
}): ReactElement => {
  return (
    <root.div mode={"closed"} style={{ ...config.styles }}>
      {cssRaw && <style>{cssRaw}</style>}
      {children}
    </root.div>
  );
};

export default ExampleWrapper;
