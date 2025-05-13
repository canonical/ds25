/* @canonical/generator-ds 0.9.0-experimental.20 */

import Component from "./PackageHeader.js";
// Needed for function-based story, safe to remove otherwise
// import type { PackageHeaderProps } from './types.js'
import type { Meta, StoryObj } from "@storybook/react";
// Needed for template-based story, safe to remove otherwise
// import type { StoryFn } from '@storybook/react'

const meta = {
  title: "PackageHeader",
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
    packageData: {
      logo: "https://dashboard.snapcraft.io/site_media/appmedia/2019/01/snap.png",
      name: "Dwarf Fortress",
      publisher: {
        name: "William Whinny",
        url: "William Whinny",
      },
    },
  },
};

/*
  Function-based story
  Direct arguments passed to the component
  Simple, but can lead to repetition if used across multiple stories with similar configurations

  export const Default = (args: PackageHeaderProps) => <Component {...args} />;
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
