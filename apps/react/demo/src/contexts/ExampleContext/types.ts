import type { Dispatch, FC, ReactNode, SetStateAction } from "react";

export interface UPDATE_ACTION<TValue = string> {
  type: "UPDATE_SETTING";
  payload: { exampleName: string; settingName: string; newValue: TValue };
}

export interface RESET_ACTION {
  type: "RESET_EXAMPLE";
  payload: { exampleName: string };
}

export type ExampleAction = UPDATE_ACTION | RESET_ACTION;

/**
 * Configuration for an example setting.
 */
export interface ExampleSetting<TValue> {
  value: TValue;
  default?: TValue;
  skipExportFormats?: {
    css?: boolean;
  };
}

/**
 * Configuration for an example that allows selecting a number.
 */
export interface NumericExampleSetting extends ExampleSetting<number> {
  min: number;
  max: number;
  step?: number;
}

/**
 * Configuration for an example that allows selecting one choice.
 */
export interface ChoicesExampleSetting<TValue> extends ExampleSetting<TValue> {
  choices: TValue[];
}

/**
 * Configuration for an example that allows selecting multiple choices.
 */
export type MultipleChoicesExampleConfiguration<TValue> = Omit<
  ChoicesExampleSetting<TValue>,
  "default" | "value"
> & {
  value: TValue;
  default: TValue;
};

/**
 * Base settings for an example. May be extended to add more settings.
 */
export interface BaseExampleSettings {
  fontFamily?: ChoicesExampleSetting<string>;
  fontSize?: NumericExampleSetting;
  color?: ChoicesExampleSetting<string>;
  backgroundColor?: ChoicesExampleSetting<string>;
  lineHeight?: NumericExampleSetting;
  textAlign?: ChoicesExampleSetting<string>;
  padding?: NumericExampleSetting;
  margin?: NumericExampleSetting;
  border?: NumericExampleSetting;
  borderRadius?: NumericExampleSetting;
  boxShadow?: ChoicesExampleSetting<string>;
  textShadow?: ChoicesExampleSetting<string>;
}

export interface ShowcaseExample<
  TSettings extends BaseExampleSettings = BaseExampleSettings,
> {
  name: string;
  description: string;
  configurations: TSettings;
  component: FC;
  cssVars?: Record<string, string | number | undefined>;
}

export type ConfigState = Record<string, ShowcaseExample>;

export interface ConfigProviderProps {
  examples: ShowcaseExample[];
  children: ReactNode;
}

export interface ConfigProviderValue<
  TSettings extends BaseExampleSettings = BaseExampleSettings,
> {
  config: ConfigState;
  dispatch: Dispatch<ExampleAction>;
  activeExampleName?: string;
  setActiveExampleName: Dispatch<SetStateAction<string | undefined>>;
  activeExampleConfig?: ShowcaseExample;
}
