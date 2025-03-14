import { useEffect, useState } from "react";
import { eventBus } from "../ExampleControls/eventBus.js";

export default function useConfig() {
  const [config, setConfig] = useState({});

  useEffect(
    () =>
      eventBus.subscribe("example-style-changed", (event) => {
        setConfig(event.detail);
      }),
    [],
  );

  useEffect(() => {
    console.log(config);
  }, [config]);

  return config;
}
