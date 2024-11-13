/* <%= pkg %> <%= version %> */
import React from 'react'
import PropTypes from 'prop-types'
import { InferProps } from 'prop-types'

<% if (includeStyles) { %>
import '<%= name %>.css'
<% } %>
  
/**
 * description
 * @param {InferProps<typeof <%= name %>.propTypes>} props
 * @returns {React.ReactElement} - Rendered <%= name %>
 */
export default function <%= name %>({
  children,
  ...props
}: InferProps<typeof <%= name %>.propTypes>): React.ReactElement {
  return (
    <div
      {...props}
    >
      {children}
    </div>
  )
}

<%= name %>.propTypes = {
  /** Child elements */
  children: PropTypes.node,
}

<%= name %>.defaultProps = {
  children: null,
}
