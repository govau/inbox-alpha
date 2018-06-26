import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const appearances = {
  button: 'button',
  link: 'link',
}

const colors = {
  transparent: 'transparent',
}

const primaryCSS = css`
  color: #22201c;
  background-color: #d1e65f;
`

const transparentCSS = css`
  color: #0f6493;
  background-color: transparent;
`

const style = css`
  cursor: pointer;
  font: inherit;
  border-width: 0;
  outline: 0;

  display: inline-block;
  text-align: center;
  width: 100%;

  ${({ appearance, color }) =>
    appearance === appearances.link
      ? css`
          padding: 0;
          ${transparentCSS};
          text-decoration: underline;
        `
      : css`
          padding: 1rem 1em;
          ${color === colors.transparent ? transparentCSS : primaryCSS}};
        `};

  @media screen and (min-width: 768px) {
    width: fit-content;
  }
`

const Button = styled(props => <button type="button" {...props} />)`
  ${style};

  &:focus {
    font-weight: bold;
  }
`

Button.defaultProps = {
  appearance: appearances.button,
}

const ButtonLink = styled(Link)`
  ${style};
  display: block;

  @media screen and (min-width: 768px) {
    display: auto;
  }
`

ButtonLink.defaultProps = {
  appearance: appearances.button,
}

export { Button, ButtonLink }
