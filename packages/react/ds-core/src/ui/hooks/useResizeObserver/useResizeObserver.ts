import { useEffect, useState } from "react";
import type { UseResizeObserverResult } from "./types.js";

/** Hook to observe the size of an element. */
export default function useResizeObserver<TElement extends HTMLElement>(
  element?: TElement | null,
): UseResizeObserverResult {
  const [size, setSize] = useState<UseResizeObserverResult>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        const rect = entry.contentRect;
        setSize({
          width: rect.width,
          height: rect.height,
        });
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return size;
}
