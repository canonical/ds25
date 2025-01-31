import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Component from "./EditableBlock.js";

const meta = {
  title: "EditableBlock",
  component: Component,
  tags: ["autodocs"],
  // if using enum for appearance, you can use the following to generate controls
  // argTypes: {
  //   appearance: {
  //      control: 'select',
  //      mapping: ButtonAppearance,
  //      options: Object.keys(ButtonAppearance),
  //   }
  // },
  args: { },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default
 */

interface SampleChildProps {
  isEditing?: boolean;
}

const SampleChild: React.FC<SampleChildProps> = ({ isEditing }) => {
  return (
    <div>
      {isEditing ? 'In editing mode.' : 'View mode.'}
    </div>
  );
};

export const Default: Story = {
  args: {
    title: "Sample Title",
    children: <SampleChild />,
  },
};
