import Button from "../examples-react/Button/Button.js";

const ComponentMap = {
  Button: Button,
};

export type ComponentKey = keyof typeof ComponentMap;

export default ComponentMap;
