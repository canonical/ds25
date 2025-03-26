/* @canonical/generator-ds 0.9.0-experimental.9 */

// Needed for function-based story, safe to remove otherwise
// import type { ListProps } from './types.js'
import type { Meta, StoryObj } from "@storybook/react";
import * as fixtures from "storybook/fixtures.options.js";
import type { Option } from "../../../../types.js";
import Component from "./List.js";
// Needed for template-based story, safe to remove otherwise
// import type { StoryFn } from '@storybook/react'

const meta = {
  title: "List",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

/*
  CSF3 story
  Uses object-based story declarations with strong TS support (`Meta` and `StoryObj`).
  Uses the latest storybook format.
*/
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: fixtures.fruits,
    items: [],
    getMenuProps: () => ({
      id: "menu-id",
      role: "listbox",
    }),
    getItemProps: ({ item, index }: { item: Option; index: number }) => ({
      id: `item-${index}`,
      role: "option",
      "aria-selected": false,
      onClick: () => {}, // Minimal event handler
    }),
    highlightedIndex: -1,
    convertItemToString: (item: Option | null) => item?.label || "",
    fieldValue: "",
    valueKey: "value" as keyof Option,
    isOpen: true,
    children: <span>Hello world!</span>,
  },
};

/*
  Function-based story
  Direct arguments passed to the component
  Simple, but can lead to repetition if used across multiple stories with similar configurations

  export const Default = (args: ListProps) => <Component {...args} />;
  Default.args = { children: <span>Hello world!</span> };
*/

/*
  Template-Based story
  Uses a template function to bind story variations, making it more reusable
  Slightly more boilerplate but more flexible for creating multiple stories with different configurations

  const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;
  export const Default: StoryFn<typeof Component> = Template.bind({});
  Default.args = {
    children: <span>Hello world!</span>
  };
*/

/*
  Static story
  Simple and straightforward, but offers the least flexibility and reusability

  export const Default: StoryFn<typeof Component> = () => (
    <Component><span>Hello world!</span></Component>
  );
*/
