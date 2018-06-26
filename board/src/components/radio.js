import React from 'react'
import styled, { css } from 'styled-components'

const RadioLabel = styled.label`
  position: relative;
`

const radioTextBeforeAfter = css`
  width: 2em;
  height: 2em;
  content: ' ';
  display: block;
  position: absolute;
  box-sizing: border-box;
  background-repeat: no-repeat;
  z-index: 100;
  left: -1px;
  top: 1px;
  border: 3px solid transparent;
  border-radius: 50%;
`

const RadioText = styled.span`
  margin-top: 0;
  margin-right: 1rem;
  cursor: pointer;
  line-height: 1.5;
  padding: 0.25em 0.5em 0.5em 2.5em;
  display: block;
  color: #313131;

  &:before {
    ${radioTextBeforeAfter};
  }
  &:after {
    ${radioTextBeforeAfter};
  }
`

const focusCSS = css`
  outline: 3px solid #9263de;
  outline-offset: 2px;
`

const RadioInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  cursor: pointer;

  &:focus {
    + ${RadioText} {
      :after {
        ${focusCSS};
      }
    }
  }

  + ${RadioText} {
    :before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23313131' cx='16' cy='16' r='16'/%3E%3Ccircle fill='%23ffffff' cx='16' cy='16' r='14'/%3E%3C/svg%3E");
    }
    :after {
      background-image: none;
      z-index: 101;
    }
  }

  &:checked {
    + ${RadioText} {
    :after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23313131' cx='16' cy='16' r='11'/%3E%3C/svg%3E");
    }
  }

  &:disabled {
    + ${RadioText} {
    :before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23cecece' cx='16' cy='16' r='16'/%3E%3Ccircle fill='%23ebebeb' cx='16' cy='16' r='14'/%3E%3C/svg%3E");
    }
  }

  &:disabled:checked {
    + ${RadioText} {
    :after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle fill='%23cecece' cx='16' cy='16' r='11'/%3E%3C/svg%3E");
    }
  }
`

const Radio = ({ children, name, onChange, value, checked }) => (
  <RadioLabel>
    <RadioInput
      name={name}
      onChange={onChange}
      value={value}
      checked={checked}
    />
    <RadioText>{children}</RadioText>
  </RadioLabel>
)

export default Radio
