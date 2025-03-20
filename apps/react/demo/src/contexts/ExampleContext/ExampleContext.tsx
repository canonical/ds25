import React, {
  createContext,
  useState,
  useContext,
  useReducer,
  type FC,
  useMemo,
  useEffect,
} from "react";
import type {
  BaseExampleSettings,
  ConfigProviderProps,
  ConfigProviderValue,
  ConfigState,
  ExampleAction,
  ExampleSetting,
  ShowcaseExample,
} from "./types.js";

import { casing } from "@canonical/utils";

const ConfigContext = createContext<ConfigProviderValue | undefined>(undefined);

const generateCssVariables = (
  configurations: BaseExampleSettings,
): Record<string, string | number | undefined> => {
  const cssVars: Record<string, string | number | undefined> = {};
  for (const settingName in configurations) {
    const setting = configurations[
      settingName as keyof BaseExampleSettings
    ] as ExampleSetting<any>;
    if (!setting?.skipExportFormats?.css && setting.value !== undefined) {
      const cssVarName = `--${casing.toKebabCase(settingName)}`;
      cssVars[cssVarName] = setting.value;
    }
  }
  return cssVars;
};

const configReducer = (
  state: ConfigState,
  action: ExampleAction,
): ConfigState => {
  switch (action.type) {
    case "UPDATE_SETTING": {
      const updatedState = {
        ...state,
        [action.payload.exampleName]: {
          ...state[action.payload.exampleName],
          configurations: {
            ...state[action.payload.exampleName]?.configurations,
            [action.payload.settingName]: {
              ...state[action.payload.exampleName]?.configurations?.[
                action.payload.settingName
              ],
              value: action.payload.newValue,
            },
          },
        },
      };
      return {
        ...updatedState,
        [action.payload.exampleName]: {
          ...updatedState[action.payload.exampleName],
          cssVars: generateCssVariables(
            updatedState[action.payload.exampleName].configurations,
          ),
        },
      };
    }
    case "RESET_EXAMPLE":
      const { [action.payload.exampleName]: exampleToReset, ...restOfState } =
        state;
      if (exampleToReset) {
        const resetConfigurations: BaseExampleSettings = {};
        for (const key in exampleToReset.configurations) {
          if (exampleToReset.configurations.hasOwnProperty(key)) {
            const setting =
              exampleToReset.configurations[key as keyof BaseExampleSettings];
            if (
              setting &&
              "default" in setting &&
              setting.default !== undefined
            ) {
              resetConfigurations[key as keyof BaseExampleSettings] = {
                ...setting,
                value: setting.default,
              };
            } else {
              resetConfigurations[key as keyof BaseExampleSettings] = setting;
            }
          }
        }
        const resetExample: ShowcaseExample = {
          ...exampleToReset,
          configurations: resetConfigurations,
          cssVars: generateCssVariables(resetConfigurations),
        };
        return {
          ...restOfState,
          [action.payload.exampleName]: resetExample,
        };
      }
      return state;
    default:
      return state;
  }
};

export const ConfigProvider: FC<ConfigProviderProps> = ({
  examples,
  children,
}) => {
  const initialState: ConfigState = examples.reduce((acc, example) => {
    acc[example.name] = example;
    return acc;
  }, {});

  const [config, dispatch] = useReducer(configReducer, initialState);
  const [activeExampleName, setActiveExampleName] = useState<
    string | undefined
  >(examples?.length ? examples[0].name : undefined);

  const activeExampleConfig = useMemo(
    () => (activeExampleName ? config[activeExampleName] : undefined),
    [config, activeExampleName],
  );

  const value: ConfigProviderValue = useMemo(
    () => ({
      config,
      dispatch,
      activeExampleName,
      setActiveExampleName,
      activeExampleConfig,
    }),
    [config, activeExampleName, activeExampleConfig],
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigProviderValue => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
