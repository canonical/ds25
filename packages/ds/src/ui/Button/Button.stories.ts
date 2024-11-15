import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "./Button.js";

const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  args: { onClick: fn() }, // allows the onClick function to be spyed on
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A default button can be used to indicate a positive action that isn't necessarily the main call-to-action.
 */
export const Default: Story = {
  args: {
    label: "Button",
  },
};

/**
 * A positive button can be used to indicate a positive action that is the main call-to-action.
 */
export const Positive: Story = {
  args: {
    label: "Button",
    appearance: "positive",
  },
};
