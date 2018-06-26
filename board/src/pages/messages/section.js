import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Icon from '../../components/icon'
import MarkdownComponent from '../../components/markdown'
import SpeechBubble from '../../components/speech-bubble'
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
  <Link to="/todo">{linkText || 'Provide a document'}</Link>
)

const RequestPayment = ({ amountInCents, linkText }) => (
  <Link to="/todo">{linkText || 'Provide payment'}</Link>
)

const RequestScheduledPayment = ({ amountInCents, linkText }) => (
  <Link to="/todo">{linkText || 'Schedule payment'}</Link>
)

const RequestCall = ({ linkText }) => (
  <Link to="/todo">{linkText || 'request a call'}</Link>
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

const Section = ({ kind, sender, ...section }) => {
  const Renderer = renderers[kind]

  return Renderer ? <Renderer {...section[lowerCase(kind)]} /> : null
}

const Message = styled(({ className, sender, readStatus, sections }) => (
  <SpeechBubble
    reversed={sender && sender.source === 'User'}
    className={className}
  >
    {sections.map((section, i) => <Section key={i} {...section} />)}
  </SpeechBubble>
))``

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
