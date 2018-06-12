import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

export default styled(({ children, className, ...props }) => (
  <i className={classnames('material-icons', className)} {...props}>
    {children}
  </i>
))``
