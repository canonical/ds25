/* @canonical/generator-ds 0.9.0-experimental.4 */
import type React from "react";
import { useFormContext } from "react-hook-form";
import type { TextareaProps } from "./types.js";
import "./styles.css";

const componentCssClassName = "ds textarea";

/**
 * description of the Textarea component
 * @returns {React.ReactElement} - Rendered Textarea
 */
const Textarea = ({
	id,
	className,
	style,
	name,
	registerProps,
}: TextareaProps): React.ReactElement => {
	const { register } = useFormContext();
	return (
		<textarea
			id={id}
			style={style}
			className={[componentCssClassName, className].filter(Boolean).join(" ")}
			{...register(name, registerProps)}
		/>
	);
};

export default Textarea;
