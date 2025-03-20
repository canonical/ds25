import type { CSSProperties } from "react";
import type { ShowcaseExample } from "../../contexts/ExampleContext/types.js";

/**
 * Props for a react component that renders the controls inside a tooltip and allows changing the example configurations.
 */
export interface ExampleControlsProps {
  id?: string;
  className?: string;
  examples: ShowcaseExample[];
  style?: CSSProperties;
}
