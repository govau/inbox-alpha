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

const BoxLabel = styled.span``

const Checkbox = styled(({ label, className, ...props }) => (
  <label className={className}>
    <Input type="checkbox" {...props} />
    <BoxLabel>{label}</BoxLabel>
  </label>
))`
  & * + * {
    margin-top: 0;
  }

  ${Input} {
    width: auto;
    display: inline-block;

    opacity: 0;
    visibility: visible;
    position: absolute;
    left: -10000px;
  }

  ${Input} + ${BoxLabel} {
    position: relative;
    padding: 0 0 0 calc(1rem + 24px);
  }

  ${Input} + ${BoxLabel}:before {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid black;
    content: "";
    height: 24px;
    width: 24px;
    }

  ${Input} + ${BoxLabel}:after {
    top: 0;
    left: 0;
    margin: 0;
    margin-top: 5px;
    margin-left: 5px;
    position: absolute;
    width: 14px;
    height: 14px;
    background: transparent;
    content: "";
    }

  ${Input}:checked + ${BoxLabel}:after {
    top: 0;
    left: 0;
    margin: 0;
    position: absolute;
    content: "";
    margin-top: 6px;
    margin-left: 5px;
    border: solid;
    border-width: 0px 0px 4px 4px;
    background: transparent;
    width: 14px;
    height: 9px;
    transform: rotate(-45deg);
    }


`

const Select = styled.select`
  ${inputCSS};
  appearance: none;

  ${props =>
    props.lite
      ? css`
          background-color: transparent;
          border: 0;
        `
      : css``};
`

const Option = styled.option``

const DropdownWrapper = styled.div`
  position: relative;

  ${Select} {
    padding-left: 4rem;
  }

  & * + * {
    margin-top: 0;
  }
`

const LabelWrapper = styled.label`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  > * + * {
    margin-top: 0;
    margin-left: 1rem;
  }
`

const DropdownIndicator = styled(Icon)`
  pointer-events: none;
  position: absolute;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  left: 1rem;
`

const Dropdown = ({ label = null, lite = false, className, ...props }) =>
  label ? (
    <LabelWrapper className={className}>
      <span>{label}</span>
      <DropdownWrapper>
        <Select lite={lite} {...props} />
        <DropdownIndicator>keyboard_arrow_down</DropdownIndicator>
      </DropdownWrapper>
    </LabelWrapper>
  ) : (
    <DropdownWrapper className={className}>
      <Select lite={lite} {...props} />
      <DropdownIndicator>keyboard_arrow_down</DropdownIndicator>
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
