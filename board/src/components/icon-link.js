import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Contents = styled.span``

const Plaintext = styled.span``

const linkCSS = css`
  color: #246add;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const Link = styled(ReactRouterLink)`
  ${linkCSS};
`

const A = styled.a`
  ${linkCSS};
`

const Mimic = styled(Plaintext)`
  ${linkCSS};
`

/* A link with a material icon next to it.
 * deals with
 *  alignment
 *  margins
 *  text-decoration reset
 * on material icons
 */
export default styled(props => {
  const {
    icon,
    children,
    reversed = false,
    plain_text = false,
    but_color_it_like_a_link_anyway = false,
    ...rest
  } = props

  const Element = plain_text
    ? but_color_it_like_a_link_anyway
      ? Mimic
      : Plaintext
    : !!props.href
      ? A
      : Link
  const link = <Element {...rest}>{children}</Element>

  return !icon ? (
    link
  ) : reversed ? (
    <Element {...rest}>
      <Contents>{children}</Contents>
      {icon}
    </Element>
  ) : (
    <Element {...rest}>
      {icon}
      <Contents>{children}</Contents>
    </Element>
  )
})`
  display: flex;
  align-items: center;
  text-decoration: none;

  * + * {
    margin-top: 0;
  }

  & > i.material-icons {
    font-size: 1.6em;
  }

  ${Contents} + i.material-icons,
  i.material-icons + ${Contents} {
    margin-left: 0.5em;
  }

  ${props =>
    props.plain_text
      ? css``
      : css`
          &:hover > ${Contents} {
            text-decoration: underline;
          }
        `};
`
