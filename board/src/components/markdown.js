import React from 'react'
import ReactMarkdown from 'react-markdown'

const Markdown = ({ source, renderers = {}, ...props }) => (
  <ReactMarkdown skipHtml source={source} renderers={renderers} {...props} />
)

export { Markdown as default }
