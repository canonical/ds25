import { debounce } from "@canonical/utils";

const fetchData = (query: string) => console.log(`Fetching data for: ${query}`);

const debouncedFetchData = debounce(fetchData, 500);

// Only the last call will be executed
debouncedFetchData("query 1").then(console.log);
debouncedFetchData("query 2").then(console.log);
debouncedFetchData("query 3").then(console.log);

// Async version
const asyncFetchData = async (query: number) => {
  console.log(`Asynchronously Fetching data for: ${query}`);
  return query;
};

const debouncedAsyncFetchData = debounce(asyncFetchData, 500);

// Only the last call will be executed
debouncedAsyncFetchData(1).then(console.log);
debouncedAsyncFetchData(2).then(console.log);
debouncedAsyncFetchData(3)
  .then((n) => n)
  .then((n) => console.log(n + 1));
