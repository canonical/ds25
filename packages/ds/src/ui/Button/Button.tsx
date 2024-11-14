import type React from "react";

import "./button.css";

//const baseClassName = 'ds'

export enum ButtonTypeEnum {
  Button = "button",
  Submit = "submit"
}

export interface ButtonProps {
  id:string,
  style:any,
  className:string,
  /** The visual style of the button */
  appearance?: "default" | "base" | "positive" | "negative" | "link";
  /** Button contents */
  label?: string;
  /** Optional click handler */
  onClick?: () => void;

  type:ButtonTypeEnum;
}


/*
 variant / modifier / appearance
 when there is a list of children : items (?) <Navigation items=> 
 <Accordion items=>
 flags : adjective/participate (disabled) or fully boolean isDisabled

 */

/** Primary UI component for user interaction */
const Button = ({
  id,
  className,
  style,
  appearance = "default",
  label,
  type:buttonType = ButtonTypeEnum.Button,
  // ref,
  ...props
}: ButtonProps): React.ReactElement => {

  return (
    <button
      id={id}
      style={style}
      className={[
        className,
        "ds-button", 
        appearance !== "default" && `ds-button--${appearance}`
      ].filter(Boolean).join(" ")
      }
      type={ buttonType }
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
