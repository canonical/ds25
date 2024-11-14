import type React from "react";

import "./button.css";

export interface ButtonProps {
  /** The visual style of the button */
  appearance?: "default" | "base" | "positive" | "negative" | "link";
  /** Button contents */
  label?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
const Button = ({
  appearance = "default",
  label,
  ...props
}: ButtonProps): React.ReactElement => {

  return (
    <button
      type="button"
      className={["ds-button", appearance !== "default" ? `ds-button--${appearance}` : ""].join(
        " ",
      )}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
