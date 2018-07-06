import React from 'react'
import styled, { css } from 'styled-components'

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

  @media screen and (min-width: 768px) {
    //width: auto;
  }
`

const Input = styled(({ reference, ...props }) => (
  <input ref={reference} {...props} />
))`
  ${inputCSS};
`

const Label = styled.label`
  ${props =>
    props.block
      ? css`
          display: block;
        `
      : css``};
`

const Text = styled(props => <Input type="text" {...props} />)``

const Password = styled(props => <Input type="password" {...props} />)``

const Submit = styled(({ children, ...props }) => (
  <Input type="submit" value={children} {...props} />
))`
  border: 0;
  background-color: #d1e65f;
  cursor: pointer;

  &:disabled {
    background-color: #f0f3f5;
  }
`

const Textarea = styled.textarea`
  ${inputCSS};
`

const FormGroup = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Checkbox = styled(({ label, className, ...props }) => (
  <label className={className}>
    <Input type="checkbox" {...props} />
    {label}
  </label>
))`
  & * + * {
    margin-top: 0;
  }

  ${Input} {
    width: auto;
    display: inline-block;
  }
`

const Dropdown = styled.select``

const Option = styled.option``

export {
  Text,
  Password,
  Submit,
  Textarea,
  Label,
  Checkbox,
  Dropdown,
  Option,
  FormGroup,
}
