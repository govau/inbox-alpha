import React from 'react'
import styled, { css } from 'styled-components'

import Icon from './icon'

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

const FormGroup = styled.section``

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

const Select = styled.select`
  ${inputCSS};
  appearance: none;
`

const Option = styled.option``

const DropdownWrapper = styled.span`
  position: relative;

  ${Select} {
    padding-right: 4rem;
  }

  & * + * {
    margin-top: 0;
  }
`

const DropdownIndicator = styled(Icon)`
  pointer-events: none;
  position: absolute;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  right: 1rem;
`

const Dropdown = props => (
  <DropdownWrapper>
    <Select {...props} />
    <DropdownIndicator>arrow_downward</DropdownIndicator>
  </DropdownWrapper>
)

/*

.Dropdown {
  composes: fieldWrapper from './field.scss';
}

.fieldIconContainer {
  composes: fieldIconContainer from './field.scss';
}

.carrot {
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  right: units(1);
}

.field {
  composes: field from './field.scss';
  padding-right: columns(1);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    &::-ms-expand {
      display: none;
    }
  }
}

.fieldInvalid {
  composes: fieldInvalid from './field.scss';
}

.fieldValid {
  composes: fieldValid from './field.scss';
}

*/

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
