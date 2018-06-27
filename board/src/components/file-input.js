import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Icon from './icon'
import IconLink from './icon-link'

const InputWrapper = styled.div``

const Label = styled.label`
  cursor: pointer;
`

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
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
          onChange={e => {
            const filename = e.target.value.split('\\').pop()
            this.setFilename(filename)
            this.props.onDocumentChange && this.props.onDocumentChange(filename)
          }}
          {...this.props}
        />

        {this.state.filename ? (
          <Fragment>
            <IconLink
              plain_text
              icon={
                <Icon style={{ transform: 'rotate(-45deg)' }}>attachment</Icon>
              }
            >
              {this.state.filename}
            </IconLink>
            <div>
              <Link
                to="/todo"
                onClick={e => {
                  e.preventDefault()
                  input.value = ''
                  this.setFilename('')
                  this.props.onAttach({ filename: this.state.filename })
                }}
              >
                Attach
              </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link
                to="/todo"
                onClick={e => {
                  e.preventDefault()
                  input.value = ''
                  this.setFilename('')
                }}
              >
                Cancel
              </Link>
            </div>
          </Fragment>
        ) : (
          <Label htmlFor={name}>
            <IconLink
              plain_text
              but_color_it_like_a_link_anyway
              icon={
                <Icon style={{ transform: 'rotate(-45deg)' }}>attachment</Icon>
              }
            >
              Select document
            </IconLink>
          </Label>
        )}
      </InputWrapper>
    )
  }
}

export { FileInput as default }
