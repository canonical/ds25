/* @canonical/generator-ds 0.9.0-experimental.4 */
import type React from 'react';
import type { DescriptionProps } from './types.js';
import './styles.css';

const componentCssClassName = "ds description";
  
/**
 * description of the Description component
 * @returns {React.ReactElement} - Rendered Description
 */
const Description = ({
  id,
  children,
  className,
  style
}: DescriptionProps): React.ReactElement => {
  return (
    <div
      id={id}
      style={style}
      className={[
                componentCssClassName,
        className
      ].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  )
};

export default Description;