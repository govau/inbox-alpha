import React from 'react'
import classnames from 'classnames'

export default ({ children, className, ...props }) => (
  <i className={classnames('material-icons', className)} {...props}>
    {children}
  </i>
)

