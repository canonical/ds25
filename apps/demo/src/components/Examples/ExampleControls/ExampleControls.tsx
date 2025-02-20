import {
  type ChangeEvent,
  type ComponentType,
  type ReactElement,
  useEffect,
  useState,
} from "react";
import type { ExampleComponentProps } from "../examples-react/types.js";
import type { ExampleControlsProps } from "./types.js";
import "./styles.css";

const ExampleControls = ({
  example,
  id,
  className,
}: ExampleControlsProps): ReactElement => {
  const [configuration, setConfiguration] = useState(example.configurations);
  const [Component, setComponent] =
    useState<ComponentType<ExampleComponentProps> | null>(null);

  useEffect(() => {
    const importComponent = async () => {
      try {
        const module = await import(
          `../examples-react/${example.component}/${example.component}.tsx`
        );
        if (module.default) {
          setComponent(() => module.default);
        } else {
          console.error(
            "Module loaded, but default export is missing:",
            module,
          );
          setComponent(null);
        }
      } catch (error) {
        console.error("Failed to load component:", error);
        setComponent(null);
      }
    };

    importComponent();
  }, [example.component]);

  // TODO these manual form updates should be handled by the form library when that is implemented
  const handleFontFamilyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!configuration.fontFamily) {
      setConfiguration({
        ...configuration,
        fontFamily: { choices: ["Arial"], default: "Arial", value: "Arial" },
      });
      return;
    }
    setConfiguration({
      ...configuration,
      fontFamily: { ...configuration.fontFamily, value: event.target.value },
    });
  };

  const handleFontSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!configuration.fontSize) {
      setConfiguration({
        ...configuration,
        fontSize: { min: 0, max: 100, default: 16, value: 16 },
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
    >
      <div className={"ds example-controls__inputs"}>
        {example.configurations.fontFamily && (
          <div>
            <label htmlFor="fontFamilySelect">Font Family:</label>
            <select
              id="fontFamilySelect"
              value={
                configuration.fontFamily?.value ||
                configuration.fontFamily?.default
              }
              onChange={handleFontFamilyChange}
            >
              {example.configurations.fontFamily.choices.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        )}
        {example.configurations.fontSize && (
          <div>
            <label htmlFor="fontSizeRange">Font Size:</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="range"
                id="fontSizeRange"
                min={example.configurations.fontSize.min}
                max={example.configurations.fontSize.max}
                value={configuration.fontSize?.value}
                onChange={handleFontSizeChange}
                aria-label="Font Size"
                aria-valuemin={example.configurations.fontSize.min}
                aria-valuemax={example.configurations.fontSize.max}
                aria-valuenow={configuration.fontSize?.value}
                aria-valuetext={`${configuration.fontSize?.value} pixels`}
              />
              <span style={{ marginLeft: "8px" }}>
                {configuration.fontSize?.value}px
              </span>
            </div>
          </div>
        )}
      </div>
      <div className={"ds example-controls__frame"}>
        {Component && (
          <Component
            styles={{
              "--font-family": configuration.fontFamily?.value,
              "--font-size": `${configuration.fontSize?.value}px`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ExampleControls;
