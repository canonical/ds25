import { throttle } from "@canonical/utils";

throttle((arg1: string, arg2: number) => {
  console.log(arg1, arg2);
}, 1000);
