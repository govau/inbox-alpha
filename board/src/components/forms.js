import React from 'react'
import styled from 'styled-components'

const Input = ({ reference, ...props }) => <input ref={reference} {...props} />

const GreatJob = styled(Input)`
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

const Text = styled(props => <GreatJob type="text" {...props} />)``

const Password = styled(props => <GreatJob type="password" {...props} />)``

const Submit = styled(({ children, ...props }) => (
  <GreatJob type="submit" value={children} {...props} />
))`
  border: 0;
  background-color: #F0F3F5;
  cursor: pointer;
`

export { Text, Password, Submit }
