import { useEffect, useState } from "react";
import { eventBus } from "../ExampleControls/eventBus.js";
import type { ExampleConfigurations } from "../ExampleControls/index.js";

export default function useConfig<
  TConfig extends ExampleConfigurations = ExampleConfigurations,
>(initialConfig: TConfig) {
  const [config, setConfig] = useState(initialConfig);

  useEffect(
    () =>
      eventBus.subscribe("example-style-changed", (event) => {
        setConfig(event.detail);
      }),
    [],
  );

  return config;
}
