/* @canonical/generator-ds 0.9.0-experimental.20 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Component from "./Label.js";

describe("Label component", () => {
  it("renders", () => {
    render(<Component>Label</Component>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Component className={"test-class"}>Label</Component>);
    expect(screen.getByText("Label")).toHaveClass("test-class");
  });
});