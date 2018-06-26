import React from 'react'
import styled from 'styled-components'

import Icon from '../../components/icon'
import MarkdownComponent from '../../components/markdown'
import { Document as DocumentComponent } from './components'

const Markdown = ({ source }) => <MarkdownComponent source={source} />

const Document = ({ filename, location, kind }) => (
  <DocumentComponent
    to={location || '/todo'}
    icon={<Icon>{kind || 'book'}</Icon>}
  >
    {filename}
  </DocumentComponent>
)

const RequestDocument = ({ linkText }) => (
  <a href="#">{linkText || 'Provide a document'}</a>
)

const RequestPayment = ({ amountInCents, linkText }) => (
  <a href="#">{linkText || 'Provide payment'}</a>
)

const RequestScheduledPayment = ({ amountInCents, linkText }) => (
  <a href="#">{linkText || 'Schedule payment'}</a>
)

const RequestCall = ({ linkText }) => (
  <a href="#">{linkText || 'request a call'}</a>
)

const renderers = {
  Markdown,
  Document,
  RequestDocument,
  RequestPayment,
  RequestScheduledPayment,
  RequestCall,
}

const lowerCase = s => s.charAt(0).toLowerCase() + s.slice(1)

const MessageWrapper = styled.section`
  background-color: ${props => (props.sender === 'User' ? 'green' : 'grey')};
`

const Section = ({ kind, sender, ...section }) => {
  const Renderer = renderers[kind]

  return Renderer ? <Renderer {...section[lowerCase(kind)]} /> : null
}

const Message = ({ sender, readStatus, sections }) => (
  <MessageWrapper sender={sender && sender.source}>
    <strong>{readStatus}</strong>
    {sections.map((section, i) => <Section key={i} {...section} />)}
  </MessageWrapper>
)

export {
  Section as default,
  Markdown,
  Document,
  RequestDocument,
  RequestPayment,
  RequestScheduledPayment,
  RequestCall,
  Message,
}
