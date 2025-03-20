/* @canonical/generator-ds 0.9.0-experimental.4 */
import type React from "react";
import type {
	CheckboxProps,
	TextProps,
	TextareaProps,
} from "./inputs/index.js";

/**
 * A generic type for an instantiated higher-order component (HOC) used as form input middleware.
 * @template ExtendedProps - The props type that extends the base FieldProps with additional properties.
 * @param WrappedComponent - The React component to be enhanced, accepting FieldProps.
 * @returns A new React component with FieldProps extended by ExtendedProps.
 */
export type InputType =
	| "text"
	| "password"
	| "email"
	| "number"
	| "tel"
	| "url"
	| "textarea"
	| "custom"
	| "checkbox";
// | "date"
// | "time"
// | "datetime-local"
// | "month"
// | "week"
// | "color";

export type InputProps = CheckboxProps | TextProps | TextareaProps;

/**
 * A type for an instantiated higher-order component (HOC) wrapping an Input.
 * This accurately represents the props that can be passed to the HOC.
 */
export type BaseFieldProps = {
	/**
	 * middleware to apply to the input
	 **/
	middleware?: FormInputHOC[];

	/**
	 * An optional wrapper component to render around the input.
	 */
	WrapperComponent?: React.ElementType;
} & InputProps;

/**
 * The props for the Field component, switching between different input types.
 */
export type FieldProps = {
	/**
	 * Type of input to render
	 */
	inputType: InputType;

	/**
	 * Custom component to render
	 **/
	CustomComponent?: React.ElementType;
} & BaseFieldProps;

export type FormInputHOC<ExtendedProps extends FieldProps = FieldProps> = (
	WrappedComponent: React.ComponentType<BaseFieldProps>,
) => React.ComponentType<ExtendedProps>;
