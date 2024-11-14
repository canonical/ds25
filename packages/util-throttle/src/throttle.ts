/**
 * Throttles a function invocation to at most once every `wait` milliseconds.
 * @param func - The function to throttle
 * @param wait - The time in milliseconds to wait between invocations
 * @returns
 */
// biome-ignore lint/suspicious/noExplicitAny: `any` args and return type are necessary for this fn
export default function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let lastCallTime: number | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (lastCallTime === null || now - lastCallTime >= wait) {
      // If the time since the last call is more than the wait time, invoke the function
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCallTime = now;
      func(...args);
    } else if (!timeout) {
      // Otherwise, set a timeout to invoke the function after the remaining time
      const remainingTime = wait - (now - lastCallTime);
      timeout = setTimeout(() => {
        lastCallTime = Date.now();
        timeout = null;
        func(...args);
      }, remainingTime);
    }
  };
}
