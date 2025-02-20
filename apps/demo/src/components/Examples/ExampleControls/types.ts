/* @canonical/generator-ds 0.9.0-experimental.4 */
export interface ExampleData {
  id: string;
  name: string;
  description: string;
  component: string;
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
