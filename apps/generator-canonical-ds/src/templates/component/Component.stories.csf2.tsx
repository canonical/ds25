/* <%= pkg %> <%= version %> */

import <%= componentName %> from './<%= componentName %>.js';
import type { <%= componentName %>Props } from './types.js'

export default {
  title: "<%= componentName %>",
  component: <%= componentName %>,
};

export const Default = (args: <%= componentName %>Props) => <<%= componentName %> {...args} />;
Default.args = {
  // argName: "argValue",
};

export const Secondary = (args: <%= componentName %>Props) => <<%= componentName %> {...args} />;
Secondary.args = {
  // Another set of args
};