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
import UploadDocument from './upload-document'

const Markdown = ({ source }) => <MarkdownComponent source={source} />

const Document = ({ filename, location, kind }) => (
  <DocumentComponent
    to={location || '/todo'}
    icon={<Icon>{kind || 'book'}</Icon>}
  >
    {filename}
  </DocumentComponent>
)

const RequestDocument = ({ conversation, linkText }) => (
  <UploadDocument conversation={conversation} />
)

const RequestPayment = ({ amountInCents, linkText }) => (
  <p>
    <Link to="/todo">{linkText || 'Provide payment'}</Link>
  </p>
)

const RequestScheduledPayment = ({ amountInCents, linkText }) => (
  <p>
    <Link to="/todo">{linkText || 'Schedule payment'}</Link>
  </p>
)

const RequestCall = ({ conversation, linkText }) => (
  <p>
    <Link to={`/messages/${conversation.id}/book-a-call`}>
      {linkText || 'Request a call'}
    </Link>
  </p>
)

const IconSided = styled.div`
  display: flex;
  flex-flow: row nowrap;

  > * + * {
    margin-top: 0;
    margin-left: 1rem;
  }
`

const Confirmation = ({ markdown }) => (
  <IconSided>
    <Icon style={{ fontSize: '3em', color: '#00653e' }}>check_circle</Icon>
    <MarkdownComponent
      source={markdown.source}
      renderers={{
        delete: ({ children }) => (
          <span style={{ opacity: '0.7' }}>{children}</span>
        ),
      }}
    />
  </IconSided>
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
  Confirmation,
}

const selectors = {
  Confirmation: ({ markdown }) => ({ markdown }),
}

const lowerCase = s => s.charAt(0).toLowerCase() + s.slice(1)

const Section = ({ innerRef, section, conversation, message }) => {
  const { kind, sender, ...rest } = section

  const Renderer = renderers[kind]
  const selector = selectors[kind] || (section => section[lowerCase(kind)])

  return Renderer ? (
    <div ref={innerRef}>
      <Renderer
        {...selector(rest)}
        conversation={conversation}
        message={message}
      />
    </div>
  ) : null
}

const Timestamp = styled(({ className, label, children }) => {
  if (!children) {
    return null
  }

  const date =
    format(children, 'ddd D MMM YYYY, h:mm a') !== 'Invalid Date'
      ? format(children, 'ddd D MMM YYYY, h:mm a')
      : children

  return (
    <div className={className}>
      {label ? `${label}: ` : ''}
      {date}
    </div>
  )
})`
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

const Message = styled(({ className, conversation, message }) => {
  let latest

  setTimeout(() => {
    latest && false && latest.scrollIntoView({ behavior: 'smooth' })
  }, 500)

  return (
    <Wrapper reversed={message.sender && message.sender.source === 'User'}>
      <Timestamp>{message.sentAt}</Timestamp>
      <SpeechBubble
        reversed={message.sender && message.sender.source === 'User'}
        className={className}
      >
        {message.sections.map((section, i) => (
          <Section
            innerRef={node => {
              latest = node
            }}
            key={i}
            section={section}
            message={message}
            conversation={conversation}
          />
        ))}
      </SpeechBubble>
      <Timestamp label="Read">{message.readAt}</Timestamp>
    </Wrapper>
  )
})``

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
