import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { useState } from "react";
import { Button } from "../Button/index.js";
import type { PopupDirection } from "../hooks/index.js";
import Component from "./Tooltip.js";

const meta = {
  title: "Tooltip",
  component: Component,
  // Add padding to all tooltips to allow their entire contents to be visible
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Message: "Hello world",
    children: <Button label="Default" />,
  },
};

export const Top: Story = {
  args: {
    Message: "Hello world",
    preferredDirections: ["top"],
    children: <Button label="Top" />,
  },
};

export const Left: Story = {
  args: {
    Message: "Hello world",
    preferredDirections: ["left"],
    children: <Button label="Left" />,
  },
};

export const BestDirection: StoryFn<typeof Component> = () => {
  const [currentDirection, setCurrentDirection] =
    useState<PopupDirection>("left");
  return (
    <Component
      Message="Resize to see the tooltip reposition itself."
      preferredDirections={["right", "top", "bottom", "left"]}
      onBestPositionChange={(direction) => {
        setCurrentDirection(direction.positionName);
      }}
    >
      <Button label={currentDirection.toUpperCase()} />
    </Component>
  );
};

export const Right: Story = {
  args: {
    Message: "Hello world",
    preferredDirections: ["right"],
    children: <Button label="Right" />,
  },
};

export const Bottom: Story = {
  args: {
    Message: "Hello world",
    preferredDirections: ["bottom"],
    children: <Button label="Bottom" />,
  },
};

//
// export const Inline: Story = {
//   render: () => (
//     <p>
//       I am a paragraph using a&nbsp;
//       <Component message={"This is a tooltip describing the word"}>
//         <span>word</span>
//       </Component>
//       &nbsp;that needs further explanation, which will be provided via a
//       tooltip.
//     </p>
//   ),
// };
