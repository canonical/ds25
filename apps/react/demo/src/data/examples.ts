import {
  ButtonExample,
  TypographicSpecimen,
} from "../ui/Example/common/index.js";
import type { ShowcaseExampleOpts } from "../ui/Example/index.js";
import DEFAULT_CONTROLS, {
  FONT_CONTROL,
  FONT_SIZE_CONTROL,
  LINE_HEIGHT_CONTROL,
} from "./defaultSettings.js";

/*
--font-family: Questa;
--font-size: 16px;
--line-height: 1.5;
--h1-margin-bottom: 20rem;
--h2-margin-bottom: 4rem;
--h3-margin-bottom: 3rem;
--h4-margin-bottom: 2rem;
--h5-margin-bottom: 1rem;
--h6-margin-bottom: 1rem;
 */

export const SHOWCASE_EXAMPLES: ShowcaseExampleOpts[] = [
  {
    name: "Typographic Specimen",
    description: "A typographic specimen with configurable font settings",
    Component: TypographicSpecimen,
    controls: [
      FONT_CONTROL({ defaultValue: "Times New Roman" }),
      FONT_SIZE_CONTROL({}),
      LINE_HEIGHT_CONTROL({}),
      {
        name: "--h1-margin-bottom",
        label: "H1 Margin Bottom",
        inputType: "range",
        min: 0.25,
        max: 12,
        step: 0.25,
        defaultValue: 8,
        transformer: (marginBottom) => `${marginBottom}rem`,
      },
      {
        name: "--h2-margin-bottom",
        label: "H2 Margin Bottom",
        inputType: "range",
        min: 0.25,
        max: 12,
        step: 0.25,
        defaultValue: 4,
        transformer: (marginBottom) => `${marginBottom}rem`,
      },
      {
        name: "--h3-margin-bottom",
        label: "H3 Margin Bottom",
        inputType: "range",
        min: 0.25,
        max: 12,
        step: 0.25,
        defaultValue: 0.75,
        transformer: (marginBottom) => `${marginBottom}rem`,
      },
      {
        name: "--h4-margin-bottom",
        label: "H4 Margin Bottom",
        inputType: "range",
        min: 0.25,
        max: 5,
        step: 0.25,
        defaultValue: 0.5,
        transformer: (marginBottom) => `${marginBottom}rem`,
      },
      {
        name: "--h5-margin-bottom",
        label: "H5 Margin Bottom",
        inputType: "range",
        min: 0.25,
        max: 5,
        step: 0.25,
        defaultValue: 0.5,
        transformer: (marginBottom) => `${marginBottom}rem`,
      },
      {
        name: "--h6-margin-bottom",
        label: "H6 Margin Bottom",
        inputType: "range",
        min: 0.25,
        max: 5,
        step: 0.25,
        defaultValue: 0.5,
        transformer: (marginBottom) => `${marginBottom}rem`,
      },
    ],
  },
  {
    name: "example1",
    description: "An example with font settings",
    Component: ButtonExample,
    controls: [
      ...DEFAULT_CONTROLS(),
      {
        name: "numButtons",
        label: "Number of buttons",
        inputType: "range",
        min: 1,
        max: 5,
        defaultValue: 1,
        disabledOutputFormats: {
          css: true,
        },
      },
    ],
  },
];
