/** Global field settings for commonly-used fields. */

import type {
  ExampleControlField,
  ExampleSettingValue,
  FieldCategory,
} from "../ui/index.js";
import { PX_TRANSFORMER, REM_TRANSFORMER } from "./transformers.js";

export const FONT_FAMILY_FIELD: ExampleControlField = {
  name: "--font-family",
  label: "Font family",
  inputType: "select",
  defaultValue: "Arial",
  options: [
    { value: "Arial", label: "Arial" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Ubuntu variable", label: "Ubuntu" },
  ],
};

export const FONT_SIZE_FIELD: ExampleControlField = {
  name: "--font-size",
  inputType: "range",
  label: "Root font size",
  defaultValue: 16,
  min: 12,
  max: 24,
  step: 1,
  demoTransformer: PX_TRANSFORMER,
};

/**
 * A field for the baseline height.
 * This is hidden and held constant to simplify the other settings, as many things currently depend on the baseline height.
 * By including it in the form, it will be included in the exported CSS, and usable as part of `calc()` expressions in exports.
 */
export const BASELINE_HEIGHT_FIELD: ExampleControlField = {
  name: "--baseline-height",
  inputType: "hidden",
  label: "Baseline height",
  defaultValue: 0.5,
  min: 0.5,
  max: 2,
  step: 0.25,
  demoTransformer: REM_TRANSFORMER,
};

export const LINE_HEIGHT_FIELD: ExampleControlField = {
  name: "--line-height",
  inputType: "range",
  label: "Root line height",
  defaultValue: 1.5,
  min: 1,
  max: 12,
  step: 0.25,
};

export const ROOT_CATEGORY: FieldCategory = {
  label: "Root",
  fields: [
    {
      ...FONT_FAMILY_FIELD,
      defaultValue: "Times New Roman",
    },
    FONT_SIZE_FIELD,
    LINE_HEIGHT_FIELD,
    BASELINE_HEIGHT_FIELD,
  ],
};
