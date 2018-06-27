import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import styled from 'styled-components'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default styled(
  ({
    className,
    editorClassName,
    toolbarClassName,
    inlineWrapperClassName,
    listWrapperClassName,
    optionWrapperClassName,
    ...props
  }) => (
    <Editor
      wrapperClassName={className}
      editorClassName={editorClassName}
      toolbarClassName={toolbarClassName}
      toolbar={{
        options: ['inline', 'list'],
        inline: {
          options: ['bold'],
          className: inlineWrapperClassName,
          bold: {
            className: optionWrapperClassName,
          },
        },
        list: {
          options: ['unordered'],
          className: listWrapperClassName,
          unordered: {
            className: optionWrapperClassName,
          },
        },
      }}
      {...props}
    />
  )
)`
  & * + * {
    margin-top: 0;
  }
`
