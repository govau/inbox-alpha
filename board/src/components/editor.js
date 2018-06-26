import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import styled from 'styled-components'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default styled(({ className, ...props }) => (
  <Editor
    wrapperClassName={className}
    toolbar={{
      options: ['inline', 'list', 'emoji'],
      inline: {
        options: ['bold'],
      },
      list: {
        options: ['unordered'],
      },
    }}
    {...props}
  />
))`
  & * + * {
    margin-top: 0;
  }
`
