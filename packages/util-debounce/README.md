## Debounce Util

Ensures that a function is only executed after a specified delay,
and if it is triggered multiple times within that delay, only the last
invocation will be executed.

This is particularly useful for scenarios like
handling user input (e.g., search queries), where you want to wait until the
user has stopped typing before executing a time-consuming operation.

By using debounce, you can optimize performance and avoid unnecessary function
calls when events like user input or window resizing occur in quick succession.

### Example

```ts
import debounce from "@canonical/util-debounce";

const fetchData = (query: string) => console.log(`Fetching data for: ${query}`);

const debouncedFetchData = debounce(fetchData, 500);

debouncedFetchData("query 1"); // Only the last call will be executed
debouncedFetchData("query 2");
debouncedFetchData("query 3");
```
