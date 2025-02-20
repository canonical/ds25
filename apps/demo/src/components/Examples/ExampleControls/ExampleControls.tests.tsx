/* @canonical/generator-ds 0.9.0-experimental.4 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExampleControls from "./ExampleControls.js";
import type { ExampleData } from "./types.js";

// Mock example data for the tests
const mockExample: ExampleData = {
  id: "button-example", // Added id
  name: "Button Example", // Added name
  description: "A button example", // Added description
  component: "Button", // Added component
  configurations: {
    fontFamily: {
      choices: ["Arial", "Helvetica", "Times New Roman"],
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
};

describe("ExampleControls component", () => {
  it("renders", () => {
    render(<ExampleControls example={mockExample} />); // Pass the mock example as a prop
    expect(screen.getByLabelText("Font Family:")).toBeInTheDocument();
    expect(screen.getByLabelText("Font Size:")).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<ExampleControls example={mockExample} className="test-class" />); // Pass the mock example and className
    expect(screen.getByLabelText("Font Family:")).toHaveClass("test-class");
  });
});
