import type {ExampleConfigItem} from "./ExampleControls/index.js";
import Button from "./examples-react/Button/Button.js";

export const EXAMPLE_MAP = {
  button: Button,
}

export const examples: ExampleConfigItem[] = [
  {
    name: "Button Example",
    description: "A button example",
    type: "react",
    component: Button,
    configurations: {
      fontFamily: {
        choices: ["Arial", "Helvetica", "Times New Roman", "Ubuntu"],
        default: "Arial",
        value: "Arial",
      },
      fontSize: {
        min: 12,
        max: 24,
        default: 16,
        value: 16,
      },
    },
  }];