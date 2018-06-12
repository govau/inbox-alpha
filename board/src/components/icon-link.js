import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const styles = css`
  display: flex;
  align-items: center;
  text-decoration: none;

  * + * {
    margin-top: 0;
  }

  & > i.material-icons {
    font-size: 2rem;
  }

  & > span {
    text-decoration: underline;
  }
`

/* A link with a material icon next to it.
 * deals with
 *  alignment
 *  margins
 *  text-decoration reset
 * on material icons
 */
export default styled(props => {
  const { icon, children, reversed = false, ...rest } = props

  const Element = !!props.href ? 'a' : Link
  const link = <Element {...rest}>{children}</Element>

  return !icon ? (
    link
  ) : reversed ? (
    <Element {...rest}>
      <span>{children}</span>
      {icon}
    </Element>
  ) : (
    <Element {...rest}>
      {icon}
      <span>{children}</span>
    </Element>
  )
})`
  ${styles};
`
