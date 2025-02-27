/* @canonical/generator-ds 0.9.0-experimental.4 */
import type { ComponentKey } from "../Renderer/index.js";

export interface ExampleStylesCSS {
  "--font-family"?: string;
  "--font-size"?: string;
}

export interface ExampleControlStateChangeEventContext {
  styles: ExampleStylesCSS;
}

export interface ExampleData {
  id: string;
  name: string;
  description: string;
  type: "react" | "web-component";
  component: ComponentKey;
  configurations: ExampleConfigurations;
}

export interface ExampleConfiguration<TValue> {
  value: TValue;
  default?: TValue;
}

export interface NumericExampleConfiguration
  extends ExampleConfiguration<number> {
  min: number;
  max: number;
}

export interface ChoicesExampleConfiguration<TValue>
  extends ExampleConfiguration<TValue> {
  choices: TValue[];
}

export type MultipleChoicesExampleConfiguration<TValue> = Omit<
  ChoicesExampleConfiguration<TValue>,
  "default" | "value"
> & {
  value: TValue[];
  default: TValue[];
};

export interface ExampleConfigurations {
  fontFamily?: ChoicesExampleConfiguration<string>;
  fontSize?: NumericExampleConfiguration;
  //[key: string]: any; // Allows for additional config options
}

export interface ExampleControlsProps {
  example: ExampleData;
  id?: string;
  className?: string;
}
