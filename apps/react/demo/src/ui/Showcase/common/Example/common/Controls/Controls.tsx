import type { ReactElement } from "react";
import type { ControlsProps } from "./types.js";
import "./styles.css";
import { Button, Chip, TooltipArea } from "@canonical/react-ds-core";
import { Field } from "@canonical/react-ds-core-form";
import { useShowcaseContext } from "../../hooks/index.js";
import { SUPPORTED_ELEMENT_SCOPES } from "../../../../../../data/index.js";

const componentCssClassname = "ds example-controls";

const Controls = ({ id, className, style }: ControlsProps): ReactElement => {
  const {
    activeExample,
    output,
    activatePrevExample,
    activateNextExample,
    copyOutput,
    resetActiveExample,
    activeElementScope,
    setActiveElementScope,
  } = useShowcaseContext();

  return (
    <div
      id={id}
      className={[componentCssClassname, className].filter(Boolean).join(" ")}
      style={{
        ...style,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div>
        {/*TODO use icon buttons when icon is implemented*/}
        <Button label={"Prev"} type="button" onClick={activatePrevExample} />
        <Button label="Next" type="button" onClick={activateNextExample} />
      </div>
      <TooltipArea
        // TODO use new form components when ready
        // TODO make something that can convert example controls into form inputs without having to specifically handle each case
        preferredDirections={["top"]}
        targetElementClassName={"config-button"}
        activateDelay={0}
        autoFit={true}
        Message={
          <>
            <h4>Example settings</h4>
            <Button
              label={"Reset to defaults"}
              type={"button"}
              onClick={resetActiveExample}
            />
            <hr />
            <div className="elements">
              <Chip
                value="All"
                appearance={!activeElementScope ? "information" : "neutral"}
                onClick={() => setActiveElementScope(undefined)}
              />
              {/*TODO move this filter to the provider*/}
              {SUPPORTED_ELEMENT_SCOPES.filter(scope => activeExample.fields.some(field => field.elementScope === scope)).map((scope) => (
                <Chip
                  key={`scope-${scope}`}
                  value={scope.toUpperCase()}
                  appearance={activeElementScope === scope ? "information" : "neutral"}
                  onClick={() => setActiveElementScope(scope)}
                />
              ))}
            </div>
            <div className="inputs">
              {activeExample.fields
                .filter(
                  (field) =>
                    (!activeElementScope && !field.elementScope) ||
                    field.elementScope === activeElementScope,
                )
                .map(
                  ({
                    name,
                    defaultValue,
                    transformer,
                    disabledOutputFormats,
                    elementScope,
                    ...fieldProps
                  }) => (
                    <Field
                      name={name}
                      key={name}
                      unregisterOnUnmount={false}
                      {...fieldProps}
                    />
                  ),
                )}
            </div>
          </>
        }
      >
        <Button label="Configure" />
      </TooltipArea>
      <Button
        type="button"
        label="Copy CSS"
        style={{ marginLeft: "auto" }}
        disabled={!output?.css}
        onClick={() => copyOutput("css")}
      />
    </div>
  );
};

export default Controls;
