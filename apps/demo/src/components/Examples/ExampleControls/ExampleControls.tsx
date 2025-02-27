import {
  type ChangeEvent,
  type ReactElement,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { ExampleConfigItem, ExampleControlsProps } from "./types.js";
import "./styles.css";
import { Button, TooltipArea } from "@canonical/react-ds-core";
import { eventBus } from "./eventBus.js";

const ExampleControls = ({
  examples,
  id,
  className,
}: ExampleControlsProps): ReactElement => {
  const [activeExample, setActiveExample] = useState<
    ExampleConfigItem | undefined
  >(examples?.length ? examples[0] : undefined);

  //const prevConfiguration = useCallback(() => {}, []);

  useEffect(() => {
    // const detail = {
    //   ...activeExample,
    //   styles: {
    //     "--font-family": activeExample?.configurations?.fontFamily?.value,
    //     "--font-size": `${activeExample?.configurations?.fontSize?.value}px`,
    //   },
    // };
    eventBus.emit("example-config-changed", activeExample);
  }, [activeExample]);

  const handleFontFamilyChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (!activeExample?.configurations.fontFamily) {
        setActiveExample({
          ...activeExample,
          configurations: {
            ...activeExample.configurations,
            fontFamily: {
              default: "Arial",
              value: "Arial",
              choices: ["Arial", "Helvetica", "sans-serif"],
            },
          },
        });
        return;
      }
      setActiveExample({
        ...activeExample,
        configurations: {
          ...activeExample.configurations,
          fontFamily: {
            ...activeExample.configurations.fontFamily,
            value: event.target.value,
          },
        },
      });
    },
    [activeExample],
  );

  const handleFontSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!activeExample?.configurations.fontSize) {
      setActiveExample({
        ...activeExample,
        configurations: {
          ...activeExample.configurations,
          fontSize: {
            min: 0,
            max: 100,
            default: 16,
            value: 16,
          },
        },
      });
      return;
    }

    setActiveExample({
      ...activeExample,
      configurations: {
        ...activeExample.configurations,
        fontSize: {
          ...activeExample.configurations.fontSize,
          value: Number.parseInt(event.target.value),
        },
      },
    });
  };

  return (
    <div
      id={id}
      className={["ds", "example-controls", className]
        .filter(Boolean)
        .join(" ")}
      // TODO, this should be some grid row class once grid is implemented
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div>
        <Button label={"Prev"} />
        <Button label="Next" />
      </div>
      <TooltipArea
        preferredDirections={["top"]}
        activateDelay={0}
        autoFit={true}
        // Todo move margin from tooltip target to the area
        style={{ marginBottom: "0.5em" }}
        Message={
          <div
            className={"ds example-controls__inputs"}
            style={{ minWidth: "250px" }}
          >
            {activeExample?.configurations.fontFamily && (
              <div style={{ marginBottom: "8px" }}>
                <label
                  htmlFor="fontFamilySelect"
                  style={{ display: "block", marginBottom: "4px" }}
                >
                  Font Family:
                </label>
                <select
                  id="fontFamilySelect"
                  value={
                    activeExample.configurations.fontFamily?.value ||
                    activeExample.configurations.fontFamily?.default
                  }
                  onChange={handleFontFamilyChange}
                  style={{ width: "100%" }}
                >
                  {activeExample.configurations.fontFamily.choices.map(
                    (font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ),
                  )}
                </select>
              </div>
            )}
            {activeExample?.configurations.fontSize && (
              <div>
                <label
                  htmlFor="fontSizeRange"
                  style={{ display: "block", marginBottom: "4px" }}
                >
                  Font Size:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="range"
                    id="fontSizeRange"
                    min={activeExample?.configurations.fontSize.min}
                    max={activeExample?.configurations.fontSize.max}
                    value={activeExample?.configurations.fontSize?.value}
                    onChange={handleFontSizeChange}
                    aria-label="Font Size"
                    aria-valuemin={activeExample?.configurations.fontSize.min}
                    aria-valuemax={activeExample?.configurations.fontSize.max}
                    aria-valuenow={
                      activeExample?.configurations.fontSize?.value
                    }
                    aria-valuetext={`${activeExample?.configurations.fontSize?.value} pixels`}
                    style={{ flexGrow: 1 }} // Allow range input to grow
                  />
                  <span style={{ marginLeft: "8px", whiteSpace: "nowrap" }}>
                    {activeExample?.configurations.fontSize?.value}px
                  </span>
                </div>
              </div>
            )}
          </div>
        }
      >
        <Button label={"Configure"} />
      </TooltipArea>
    </div>
  );
};

export default ExampleControls;
