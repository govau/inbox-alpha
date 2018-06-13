import React from 'react'

class Toggle extends React.Component {
  state = { on: this.props.on }

  activate = e => {
    this.setState({
      ...this.state,
      on: true,
    })
  }

  deactivate = e => {
    this.setState({
      ...this.state,
      on: false,
    })
  }

  toggle = e => {
    this.setState({
      ...this.state,
      on: !this.state.on,
    })
  }

  render() {
    return this.props.children({
      on: this.state.on,
      activate: this.activate,
      deactivate: this.deactivate,
      toggle: this.toggle,
    })
  }
}

export { Toggle as default }
