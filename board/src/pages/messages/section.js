import React from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import styled, { css } from 'styled-components'

import Icon from '../../components/icon'
import MarkdownComponent from '../../components/markdown'
import SpeechBubble from '../../components/speech-bubble'
import { Document as DocumentComponent } from './components'

import MakePayment from './make-payment'
import MakePaymentCall from './make-payment-call'

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
  MakePaymentCall,
  MakePayment,
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

const Timestamp = styled(
  ({ className, label, children }) =>
    children ? (
      <div className={className}>
        {label ? `${label}: ` : ''}
        {children}
      </div>
    ) : null
)`
  opacity: 0.7;
  font-size: 0.8em;
  margin-left: 3rem;

  & + * {
    margin-top: 1rem;
  }
`

const Wrapper = styled.div`
  ${props =>
    props.reversed
      ? css`
          align-self: flex-end;
        `
      : css``};

  ${SpeechBubble} + ${Timestamp} {
    margin-top: 1rem;
  }
`

const Message = styled(({ className, conversation, message }) => (
  <Wrapper reversed={message.sender && message.sender.source === 'User'}>
    <Timestamp>{format(message.sentAt, 'ddd D MMM YYYY, h:mm a')}</Timestamp>
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
    <Timestamp label="Read">
      {format(message.readAt, 'ddd D MMM YYYY, h:mm a')}
    </Timestamp>
  </Wrapper>
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
