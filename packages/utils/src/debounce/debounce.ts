/**
 * Creates a debounced version of a function, ensuring it is called only after a specified
 * delay from the last invocation.
 *
 * @template F The type of the function to debounce
 * @param {F} fn - The function to debounce.
 * @param {number} delay - The time in milliseconds to wait before calling the function after the last call.
 * @returns {(...args: Parameters<F>) => Promise<ReturnType<F>>} A debounced version of the function.
 */
export default function debounce<
  F extends (...args: Parameters<F>) => ReturnType<F>,
>(fn: F, delay: number): (...args: Parameters<F>) => Promise<ReturnType<F>> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let promiseReject: ((reason?: string) => void) | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    // Timer already exists, clear it and reject the promise
    if (timeoutId) {
      clearTimeout(timeoutId);
      if (promiseReject) {
        promiseReject();
      }
    }

    // Create a new promise and set the timeout
    return new Promise<ReturnType<F>>((resolve, reject) => {
      promiseReject = reject;
      timeoutId = setTimeout(async () => {
        // Timer hasn't been cancelled, call the function
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
