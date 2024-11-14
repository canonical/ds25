## Throttle Util
Throttling limits the number of times a function can be called over a specified 
period. This is particularly useful for event listeners (such as scroll or resize), 
which can trigger frequently and lead to performance issues. 

By using throttle, you can ensure that a function runs at most once in each 
specified time interval, reducing application load and improving responsiveness.

### Example

```ts
import throttle from "@canonical/util-throttle";

window.addEventListener(
  'resize',
  throttle(() => {
    console.log("window was resized!");
  }, 10);
);

```
