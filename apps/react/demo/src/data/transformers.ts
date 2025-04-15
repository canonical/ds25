import type {
  ExampleControlFieldAllTransformers,
  ExampleSettingValue,
} from "../ui/index.js";

export const PX_TRANSFORMER = (value: ExampleSettingValue) => `${value}px`;

/**
 * Converts a value to the product of itself and the baseline height.
 * This effectively functions as a `bem` (baseline em) unit.
 * @param value The value to convert.
 * @returns CSS string representing the value multiplied by the baseline height.
 */
export const BASELINE_MULTIPLE_TRANSFORMER = (value: ExampleSettingValue) =>
  `calc(${value} * var(--baseline-height))`;

export const REM_TRANSFORMER = (value: ExampleSettingValue) => `${value}rem`;

/*
  Because we are using the shadow DOM to isolate styles from the rest of the page,
  we shouldn't use `rem` units directly in the demo CSS, as it is relative to document root,
  not the shadow DOM root.
  To get around this, the in-browser demo directly multiplies font-relative settings by the root font size.
  Then, when exporting, we can convert the values to `rem` units, to simplify the exported CSS.
 */
const FONT_RELATIVE_TRANSFORMER = (value: ExampleSettingValue) =>
  `calc(${value} * var(--font-size))`;

/**
 * A pair of transformers for converting settings to functions of the font size in the demo,
 * and to `rem` units in the exported CSS.
 */
export const FONT_RELATIVE_TRANSFORMERS: ExampleControlFieldAllTransformers = {
  demoTransformer: FONT_RELATIVE_TRANSFORMER,
  exportTransformer: REM_TRANSFORMER,
};
