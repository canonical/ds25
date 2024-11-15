import type React from "react";

import "./styles.css";

export interface ButtonProps {
  /* A unique identifier for the button */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** The visual style of the button */
  appearance?: "default" | "base" | "positive" | "negative" | "link";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/*
  TODO: decide on coding conventions for props
    - listing values in types:
      - unions vs TS enums vs object with ValuesOf
    - "variants": variant / modifier / appearance
    - using children vs prop:
        - when there is a list of children:
          items (?) <Navigation items=> <Accordion items=>
    - flags : adjective/participate (disabled) or fully boolean isDisabled
 */

/** Buttons are clickable elements used to perform an action. */
const Button = ({
  id,
  className,
  appearance = "default",
  label,
  ...props // TODO: allow other props - currently we spead all props, but they are not allowed by the type
}: ButtonProps): React.ReactElement => {
  return (
    <button
      id={id}
      className={[
        className,
        "ds-button",
        appearance !== "default" && `ds-button--${appearance}`,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;
