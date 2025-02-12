/* @canonical/generator-canonical-ds 0.0.1 */

import { useState } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import * as fixtures from "./fixtures.js";
import Component from "./index.js";

const meta = {
  title: "GitDiffViewer",
  tags: ["autodocs"],
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    diff: fixtures.diffExample,
    children: (
      <>
        <Component.FileHeader showCollapse showChangeCount />
        <Component.CodeDiff />
      </>
    ),
    wrapLines: false,
    lineDecorations: {},
  },
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Component
        {...args}
        collapsed={collapsed}
        onCollapseToggle={setCollapsed}
      >
        {args.children}
      </Component>
    );
  },
};

export const WithComments: Story = {
  args: {
    diff: fixtures.diffExample,
    wrapLines: false,
    collapsed: false,
    lineDecorations: {
      20: fixtures.commentExample,
    },
    children: (
      <>
        <Component.FileHeader showChangeCount />
        <Component.CodeDiff>{fixtures.addCommentExample}</Component.CodeDiff>
      </>
    ),
  },
};

export const DeletedFile: Story = {
  args: {
    diff: fixtures.deletedFileDiffExample,
    wrapLines: false,
    collapsed: false,
    lineDecorations: {},
    children: (
      <>
        <Component.FileHeader showChangeCount />
        <Component.CodeDiff />
      </>
    ),
  },
};

export const AddedFile: Story = {
  args: {
    diff: fixtures.addedFileDiffExample,
    wrapLines: false,
    collapsed: false,
    lineDecorations: {},
    children: (
      <>
        <Component.FileHeader showChangeCount />
        <Component.CodeDiff />
      </>
    ),
  },
};
