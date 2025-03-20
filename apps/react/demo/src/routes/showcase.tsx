import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { ConfigProvider } from "../contexts/ExampleContext/ExampleContext.js";
import type { ShowcaseExample } from "../contexts/ExampleContext/types.js";
import { ExampleControls } from "../ui/ExampleControls/index.js";
import { ExampleRenderer } from "../ui/ExampleRenderer/index.js";
import { Button, TypographicSpecimen } from "../ui/examples/index.js";

export const Route = createFileRoute("/showcase")({
  component: Showcase,
});

const initialExamples: ShowcaseExample[] = [
  {
    name: "Typographic Specimen",
    description: "A typographic specimen with configurable font settings",
    component: TypographicSpecimen,
    configurations: {
      fontFamily: {
        value: "Arial",
        default: "Arial",
        choices: ["Arial", "Helvetica", "Times New Roman"],
      },
      fontSize: {
        value: 16,
        default: 16,
        min: 12,
        max: 24,
      },
      lineHeight: {
        value: 1.5,
        default: 1.5,
        min: 0.5,
        max: 4,
        step: 0.5,
      },
    },
  },
  {
    name: "example1",
    description: "An example with font settings",
    component: Button,
    configurations: {
      fontFamily: {
        value: "Arial",
        default: "Arial",
        choices: ["Arial", "Helvetica", "Times New Roman"],
      },
      fontSize: {
        value: 16,
        default: 16,
        min: 12,
        max: 24,
      },
      lineHeight: {
        value: 1.5,
        default: 1.5,
        min: 0.5,
        max: 4,
        step: 0.5,
      },
    },
  },
];

export function Showcase() {
  return (
    <ConfigProvider examples={initialExamples}>
      <div>
        <ExampleRenderer />
        <ExampleControls
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
          }}
          examples={initialExamples}
        />
      </div>
    </ConfigProvider>
  );
}
