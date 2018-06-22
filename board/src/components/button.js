import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const style = css`
  font: inherit;
  border-width: 0;
  outline: 0;

  display: inline-block;
  padding: 1rem 1em;
  text-align: center;
  color: #22201c;
  background-color: #d1e65f;
  width: 100%;

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
