import React, { Component } from 'react'
import styled from 'styled-components'

import { Button } from './button'
import Icon from './icon'

const InputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  * + * {
    margin-top: 0;
  }
`

const Trigger = styled(Button)`
  background-color: transparent;
  border: 2px solid ${props => props.theme.bodyColour};
`

const Label = styled.label`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

const FileInfo = styled.div`
  margin: 0 2rem;
  color: #717171;

  & + ${Icon} {
    cursor: pointer;
    color: #717171;
  }
`

class FileInput extends Component {
  state = { filename: null }

  setFilename = filename => {
    this.setState({
      ...this.state,
      filename,
    })
  }

  render() {
    let input
    const { name } = this.props

    return (
      <InputWrapper>
        <Input
          id={name}
          name={name}
          type="file"
          ref={node => {
            input = node
          }}
          onChange={e => this.setFilename(e.target.value.split('\\').pop())}
          {...this.props}
        />

        <Trigger>
          <Label htmlFor={name}>
            <Icon style={{ transform: 'rotate(-45deg)' }}>attachment</Icon>{' '}
            Attach document
          </Label>
        </Trigger>
        <FileInfo>{this.state.filename}</FileInfo>
        {this.state.filename ? (
          <Icon
            onClick={e => {
              input.value = ''
              this.setFilename('')
            }}
          >
            close
          </Icon>
        ) : null}
      </InputWrapper>
    )
  }
}

export { FileInput as default }
