import {
  type ChangeEvent,
  type ReactElement,
  useCallback,
  useState,
} from "react";
import type { ExampleControlsProps } from "./types.js";
import "./styles.css";
import { Button, TooltipArea } from "@canonical/react-ds-core";
import { useConfig } from "../../contexts/ExampleContext/ExampleContext.js";

const ExampleControls = ({
  examples,
  id,
  className,
  style,
}: ExampleControlsProps): ReactElement => {
  const {
    dispatch,
    activeExampleConfig,
    activeExampleName,
    setActiveExampleName,
  } = useConfig();

  const handleFontFamilyChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (activeExampleName) {
        dispatch({
          type: "UPDATE_SETTING",
          payload: {
            exampleName: activeExampleName,
            settingName: "fontFamily",
            newValue: event.target.value,
          },
        });
      }
    },
    [activeExampleName, dispatch],
  );

  const handleFontSizeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (activeExampleName) {
        dispatch({
          type: "UPDATE_SETTING",
          payload: {
            exampleName: activeExampleName,
            settingName: "fontSize",
            newValue: `${event.target.value}px`,
          },
        });
      }
    },
    [activeExampleName, dispatch],
  );

  const handlePrevExample = useCallback(() => {
    if (examples?.length) {
      const currentIndex = examples.findIndex(
        (ex) => ex.name === activeExampleName,
      );
      const prevIndex = (currentIndex - 1 + examples.length) % examples.length;
      console.log({ currentIndex, prevIndex });
      setActiveExampleName(examples[prevIndex].name);
    }
  }, [activeExampleName, examples]);

  const handleNextExample = useCallback(() => {
    if (examples?.length) {
      const currentIndex = examples.findIndex(
        (ex) => ex.name === activeExampleName,
      );
      const nextIndex = (currentIndex + 1) % examples.length;
      setActiveExampleName(examples[nextIndex].name);
    }
  }, [activeExampleName, examples]);

  return (
    <div
      id={id}
      className={["ds", "example-controls", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...style,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div>
        {/*TODO use icon buttons when icon is implemented*/}
        <Button label={"Prev"} onClick={handlePrevExample} />
        <Button label="Next" onClick={handleNextExample} />
      </div>
      <TooltipArea
        // TODO use new form components when ready
        // TODO make something that can convert example controls into form inputs without having to specifically handle each case
        preferredDirections={["top"]}
        activateDelay={0}
        autoFit={true}
        Message={
          <div
            className={"ds example-controls__inputs"}
            style={{ minWidth: "250px" }}
          >
            {activeExampleConfig?.configurations?.fontFamily && (
              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="fontFamilySelect"
                  style={{ display: "block", marginBottom: "4px" }}
                >
                  Font Family:
                </label>
                <select
                  id="fontFamilySelect"
                  value={activeExampleConfig.configurations.fontFamily.value}
                  onChange={handleFontFamilyChange}
                  style={{ width: "100%" }}
                >
                  {activeExampleConfig.configurations.fontFamily.choices.map(
                    (font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ),
                  )}
                </select>
              </div>
            )}
            {activeExampleConfig?.configurations?.fontSize && (
              <div>
                <label
                  htmlFor="fontSizeRange"
                  style={{ display: "block", marginBottom: "0.25rem" }}
                >
                  Font Size:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="range"
                    id="fontSizeRange"
                    min={activeExampleConfig.configurations.fontSize.min}
                    max={activeExampleConfig.configurations.fontSize.max}
                    // The value is stored in px, so we need to convert it to a number
                    value={Number.parseInt(
                      activeExampleConfig.configurations.fontSize.value,
                    )}
                    step={activeExampleConfig.configurations.fontSize.step}
                    onChange={handleFontSizeChange}
                    aria-label="Font Size"
                    aria-valuemin={
                      activeExampleConfig.configurations.fontSize.min
                    }
                    aria-valuemax={
                      activeExampleConfig.configurations.fontSize.max
                    }
                    aria-valuenow={
                      activeExampleConfig.configurations.fontSize.value
                    }
                    aria-valuetext={`${activeExampleConfig.configurations.fontSize.value} pixels`}
                    style={{ flexGrow: 1 }}
                  />
                  <span style={{ marginLeft: "8px", whiteSpace: "nowrap" }}>
                    {Number.parseInt(
                      activeExampleConfig.configurations.fontSize.value,
                    )}
                    px
                  </span>
                </div>
              </div>
            )}
            {/* Add controls for other configurations here, e.g., color */}
            {activeExampleConfig?.configurations?.color && (
              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="colorSelect"
                  style={{ display: "block", marginBottom: "4px" }}
                >
                  Color:
                </label>
                <select
                  id="colorSelect"
                  value={activeExampleConfig.configurations.color.value}
                  onChange={(event) => {
                    if (activeExampleName) {
                      dispatch({
                        type: "UPDATE_SETTING",
                        payload: {
                          exampleName: activeExampleName,
                          settingName: "color",
                          newValue: event.target.value,
                        },
                      });
                    }
                  }}
                  style={{ width: "100%" }}
                >
                  {activeExampleConfig.configurations.color.choices.map(
                    (choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ),
                  )}
                </select>
              </div>
            )}
            {/* Example for lineHeight */}
            {activeExampleConfig?.configurations?.lineHeight && (
              <div>
                <label
                  htmlFor="lineHeightRange"
                  style={{ display: "block", marginBottom: "0.25rem" }}
                >
                  Line Height:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="range"
                    id="lineHeightRange"
                    min={activeExampleConfig.configurations.lineHeight.min}
                    max={activeExampleConfig.configurations.lineHeight.max}
                    value={activeExampleConfig.configurations.lineHeight.value}
                    step={activeExampleConfig.configurations.lineHeight.step}
                    onChange={(event) => {
                      if (activeExampleName) {
                        dispatch({
                          type: "UPDATE_SETTING",
                          payload: {
                            exampleName: activeExampleName,
                            settingName: "lineHeight",
                            newValue: Number.parseFloat(event.target.value),
                          },
                        });
                      }
                    }}
                    aria-label="Line Height"
                    aria-valuemin={
                      activeExampleConfig.configurations.lineHeight.min
                    }
                    aria-valuemax={
                      activeExampleConfig.configurations.lineHeight.max
                    }
                    aria-valuenow={
                      activeExampleConfig.configurations.lineHeight.value
                    }
                    aria-valuetext={`${activeExampleConfig.configurations.lineHeight.value}`}
                    style={{ flexGrow: 1 }}
                  />
                  <span style={{ marginLeft: "8px", whiteSpace: "nowrap" }}>
                    {activeExampleConfig.configurations.lineHeight.value}
                  </span>
                </div>
              </div>
            )}
          </div>
        }
      >
        <Button label="Configure" />
      </TooltipArea>
      <Button
        label="Copy"
        disabled={!activeExampleConfig.cssVars}
        onClick={() =>
          navigator.clipboard.writeText(
            Object.entries(activeExampleConfig.cssVars)
              .map((d) => `${d[0]}: ${d[1]};`)
              .join("\n"),
          )
        }
      />
    </div>
  );
};

export default ExampleControls;
