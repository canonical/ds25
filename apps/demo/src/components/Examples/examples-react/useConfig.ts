import { useEffect, useState } from "react";
import { eventBus } from "../ExampleControls/eventBus.js";
import type { BaseExampleSettings } from "../ExampleControls/index.js";

export default function useConfig<
  TConfig extends BaseExampleSettings = BaseExampleSettings,
>(initialConfig: TConfig) {
  const [config, setConfig] = useState(initialConfig);

  useEffect(
    () =>
      eventBus.subscribe("example-config-changed", (event) => {
        setConfig(event.detail);
      }),
    [],
  );

  return config;
}
