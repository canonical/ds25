import { createElement } from "react";
import type { ExampleConfigItem } from "../ExampleControls/index.js";
import ComponentMap from "./ComponentMap.js";

interface WrapperProps {
  example: ExampleConfigItem;
}

const ReactRenderer: React.FC<WrapperProps> = ({ example }) => {
  const el = ComponentMap[example.component];

  if (!el) {
    throw new Error(`Unknown component: ${example.component}`);
  }

  return createElement(el);
};

export default ReactRenderer;
