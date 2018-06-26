import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const colors = {
  transparent: 'transparent',
}

const primaryCSS = css`
  color: #22201c;
  background-color: #d1e65f;
`

const transparentCSS = css``

const style = css`
  font: inherit;
  border-width: 0;
  outline: 0;

  display: inline-block;
  padding: 1rem 1em;
  text-align: center;
  width: 100%;

  ${({ color }) =>
    color === colors.transparent ? transparentCSS : primaryCSS};

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

const ButtonLink = styled(Link)`
  ${style};
  display: block;

  @media screen and (min-width: 768px) {
    display: auto;
  }
`

export { Button, ButtonLink }
