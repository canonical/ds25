import throttle from "@canonical/util-throttle";

throttle((arg1: string, arg2: number) => {
  console.log(arg1, arg2);
}, 1000);
