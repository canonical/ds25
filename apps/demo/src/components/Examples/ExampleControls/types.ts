import {EXAMPLE_MAP} from "../examples.js";

export type ExampleComponentTypeIdentifier = "react";

export interface ExampleConfigItem {
  name: string;
  description: string;
  type: ExampleComponentTypeIdentifier;
  exampleIdentifier: keyof typeof EXAMPLE_MAP;
  configurations: BaseExampleSettings;
}

export interface ExampleSetting<TValue> {
  value: TValue;
  default?: TValue;
}

export interface NumericExampleSetting extends ExampleSetting<number> {
  min: number;
  max: number;
}

export interface ChoicesExampleSetting<TValue> extends ExampleSetting<TValue> {
  choices: TValue[];
}

export type MultipleChoicesExampleConfiguration<TValue> = Omit<
  ChoicesExampleSetting<TValue>,
  "default" | "value"
> & {
  value: TValue[];
  default: TValue[];
};

export interface BaseExampleSettings {
  fontFamily?: ChoicesExampleSetting<string>;
  fontSize?: NumericExampleSetting;
}

export interface ExampleControlsProps {
  id?: string;
  className?: string;
  examples: ExampleConfigItem[];
}
