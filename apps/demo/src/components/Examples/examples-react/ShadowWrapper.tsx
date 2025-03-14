import type { CSSProperties, ReactElement, ReactNode } from "react";
import root from "react-shadow";

const ShadowWrapper = ({
  style,
  children,
}: {
  style?: CSSProperties;
  children: ReactNode;
}): ReactElement => {
  return (
    <root.div style={style} mode={"closed"}>
      {children}
    </root.div>
  );
};

export default ShadowWrapper;
