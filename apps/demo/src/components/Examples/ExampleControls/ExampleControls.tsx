import {
  type ChangeEvent,
  type ReactElement,
  useEffect,
  useState,
} from "react";
import type {
  ExampleConfigurations,
  ExampleControlsProps,
} from "./types.js";
import "./styles.css";
import {Button, TooltipArea} from "@canonical/react-ds-core";
import {eventBus} from "./eventBus.js";

const ExampleControls = ({
                           example,
                           id,
                           className,
                         }: ExampleControlsProps): ReactElement => {
  const [configuration, setConfiguration] = useState<ExampleConfigurations>(
    example.configurations,
  );

  useEffect(() => {
    const detail = {
      detail: {
        styles: {
          "--font-family": configuration.fontFamily?.value,
          "--font-size": `${configuration.fontSize?.value}px`,
        },
      },
      bubbles: true,
      composed: true,
    };
    eventBus.emit("example-style-changed", detail, document.getElementById('js-event-root') as HTMLElement);
  }, [configuration]);

  const handleFontFamilyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!configuration.fontFamily) {
      setConfiguration({
        ...configuration,
        fontFamily: {choices: ["Arial"], default: "Arial", value: "Arial"},
      });
      return;
    }
    setConfiguration({
      ...configuration,
      fontFamily: {...configuration.fontFamily, value: event.target.value},
    });
  };

  const handleFontSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!configuration.fontSize) {
      setConfiguration({
        ...configuration,
        fontSize: {min: 0, max: 100, default: 16, value: 16},
      });
      return;
    }

    setConfiguration({
      ...configuration,
      fontSize: {
        ...configuration.fontSize,
        value: Number.parseInt(event.target.value),
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
      style={{display: "flex", flexDirection: "row", alignItems: "center"}}
    >
      <TooltipArea
        preferredDirections={["top"]}
        activateDelay={0}
        Message={
          <div
            className={"ds example-controls__inputs"}
            style={{minWidth: "250px"}}
          >
            {configuration.fontFamily && (
              <div style={{marginBottom: "8px"}}>
                <label
                  htmlFor="fontFamilySelect"
                  style={{display: "block", marginBottom: "4px"}}
                >
                  Font Family:
                </label>
                <select
                  id="fontFamilySelect"
                  value={
                    configuration.fontFamily?.value ||
                    configuration.fontFamily?.default
                  }
                  onChange={handleFontFamilyChange}
                  style={{width: "100%"}}
                >
                  {configuration.fontFamily.choices.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {configuration.fontSize && (
              <div>
                <label
                  htmlFor="fontSizeRange"
                  style={{display: "block", marginBottom: "4px"}}
                >
                  Font Size:
                </label>
                <div style={{display: "flex", alignItems: "center"}}>
                  <input
                    type="range"
                    id="fontSizeRange"
                    min={configuration.fontSize.min}
                    max={configuration.fontSize.max}
                    value={configuration.fontSize?.value}
                    onChange={handleFontSizeChange}
                    aria-label="Font Size"
                    aria-valuemin={configuration.fontSize.min}
                    aria-valuemax={configuration.fontSize.max}
                    aria-valuenow={configuration.fontSize?.value}
                    aria-valuetext={`${configuration.fontSize?.value} pixels`}
                    style={{flexGrow: 1}} // Allow range input to grow
                  />
                  <span style={{marginLeft: "8px", whiteSpace: "nowrap"}}>
                    {configuration.fontSize?.value}px
                  </span>
                </div>
              </div>
            )}
          </div>
        }
      >
        <Button label={"Configure"}/>
      </TooltipArea>
    </div>
  );
};

export default ExampleControls;
