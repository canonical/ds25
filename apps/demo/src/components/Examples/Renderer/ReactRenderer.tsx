import { createElement } from "react";
import type { ExampleData } from "../ExampleControls/index.js";
import ComponentMap from "./ComponentMap.js";

interface WrapperProps {
  example: ExampleData;
}

const ReactRenderer: React.FC<WrapperProps> = ({ example }) => {
  const el = ComponentMap[example.component];

  if (!el) {
    throw new Error(`Unknown component: ${example.component}`);
  }

  return createElement(el);
};

export default ReactRenderer;
