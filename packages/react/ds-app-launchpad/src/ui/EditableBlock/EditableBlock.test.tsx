/* @canonical/generator-ds 0.8.0-experimental.0 */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EditableBlock, { useEditing } from "./EditableBlock.js";

const SampleEditComponent = () => {
  return <div>Sample</div>;
};

describe("EditableBlock component", () => {
  it("renders children content", () => {
    render(
      <EditableBlock
        title={"Hello world!"}
        EditComponent={SampleEditComponent}
      />,
    );
    expect(screen.getByText("Sample")).toBeInTheDocument();
  });

  it("toggles editing state when icon is clicked", () => {
    render(
      <EditableBlock
        title={"Hello world!"}
        EditComponent={SampleEditComponent}
      />,
    );
    const editIcon = screen.getByRole("button");
    fireEvent.click(editIcon);
    expect(editIcon).toHaveClass("editable-block-component__icon--close");
    fireEvent.click(editIcon);
    expect(editIcon).toHaveClass("editable-block-component__icon--edit");
  });

  it("toggles editing state when Enter key is pressed", () => {
    render(
      <EditableBlock
        title={"Hello world!"}
        EditComponent={SampleEditComponent}
      />,
    );
    const editIcon = screen.getByRole("button");
    fireEvent.keyUp(editIcon, { key: "Enter", code: "Enter", charCode: 13 });
    expect(editIcon).toHaveClass("editable-block-component__icon--close");
    fireEvent.keyUp(editIcon, { key: "Enter", code: "Enter", charCode: 13 });
    expect(editIcon).toHaveClass("editable-block-component__icon--edit");
  });

  it("toggles editing state when Space key is pressed", () => {
    render(
      <EditableBlock
        title={"Hello world!"}
        EditComponent={SampleEditComponent}
      />,
    );
    const editIcon = screen.getByRole("button");
    fireEvent.keyUp(editIcon, { key: " ", code: "Space", charCode: 32 });
    expect(editIcon).toHaveClass("editable-block-component__icon--close");
    fireEvent.keyUp(editIcon, { key: " ", code: "Space", charCode: 32 });
    expect(editIcon).toHaveClass("editable-block-component__icon--edit");
  });

  it("provides editing context to children", () => {
    const ChildComponent = () => {
      const { isEditing } = useEditing();
      return <div>{isEditing ? "Editing" : "Not Editing"}</div>;
    };

    render(
      <EditableBlock title={"Hello world!"} EditComponent={ChildComponent} />,
    );

    expect(screen.getByText("Not Editing")).toBeInTheDocument();
    const editIcon = screen.getByRole("button");
    fireEvent.click(editIcon);
    expect(screen.getByText("Editing")).toBeInTheDocument();
  });
});
