import React, { Component, Fragment } from 'react'
import markdownify from 'draftjs-to-markdown'

import Editor from '../../components/editor'

class Compose extends Component {
  state = { editorContent: '' }

  setEditorContent = editorContent => {
    this.setState({
      ...this.state,
      editorContent,
    })
  }

  render() {
    return (
      <Fragment>
        <Editor
          onContentStateChange={contentState => {
            this.setEditorContent(markdownify(contentState))
          }}
        />
      </Fragment>
    )
  }
}

export default Compose
