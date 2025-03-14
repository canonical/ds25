import type { ReactElement, ReactNode } from "react";
import root from "react-shadow";
import type { ExampleConfigurations } from "../ExampleControls/index.js";

const ExampleWrapper = ({
  cssRaw,
  children,
  config,
}: {
  cssRaw?: string;
  children: ReactNode;
  config: ExampleConfigurations;
}): ReactElement => {
  return (
    <root.div mode={"closed"} style={{ ...config.styles }}>
      {cssRaw && <style>{cssRaw}</style>}
      {children}
    </root.div>
  );
};

export default ExampleWrapper;
