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

const RequestCall = ({ conversation, linkText }) => (
  <Link to={`/messages/${conversation.id}/book-a-call`}>
    {linkText || 'Request a call'}
  </Link>
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

const Section = ({ section, conversation, message }) => {
  const { kind, sender, ...rest } = section
  const Renderer = renderers[kind]

  return Renderer ? (
    <Renderer
      {...rest[lowerCase(kind)]}
      conversation={conversation}
      message={message}
    />
  ) : null
}

const Message = styled(({ className, conversation, message }) => (
  <SpeechBubble
    reversed={message.sender && message.sender.source === 'User'}
    className={className}
  >
    {message.sections.map((section, i) => (
      <div key={i}>
        <Section
          section={section}
          message={message}
          conversation={conversation}
        />
      </div>
    ))}
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
