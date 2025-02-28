/* @canonical/generator-ds 0.9.0-experimental.4 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Component from "./Checkbox.js";

describe("Checkbox component", () => {
  it("renders", () => {
    render(<Component>Checkbox</Component>);
    expect(screen.getByText('Checkbox')).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Component className={"test-class"}>Checkbox</Component>);
    expect(screen.getByText("Checkbox")).toHaveClass("test-class");
  });
});