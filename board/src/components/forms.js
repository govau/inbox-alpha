import React from 'react'
import styled, { css } from 'styled-components'

const Input = ({ reference, ...props }) => <input ref={reference} {...props} />

export const inputCSS = css`
  display: block;
  width: 100%;
  font-size: 1em;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 2px;

  &:focus {
    outline: 3px solid #d1e65f;
  }
`

const GreatJob = styled(Input)`
  ${inputCSS};
`

const Text = styled(props => <GreatJob type="text" {...props} />)``

const Password = styled(props => <GreatJob type="password" {...props} />)``

const Submit = styled(({ children, ...props }) => (
  <GreatJob type="submit" value={children} {...props} />
))`
  border: 0;
  background-color: #f0f3f5;
  cursor: pointer;
`

export { Text, Password, Submit }
