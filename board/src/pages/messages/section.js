import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

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

const MessageWrapper = styled.section`
  background-color: #f3f5f5;
  padding: 2rem;
  border-radius: 4px;

  ${props =>
    props.sender === 'User'
      ? css`
          background-color: #f1f3d6;
          align-self: flex-end;
        `
      : css``};
`

const Section = ({ kind, sender, ...section }) => {
  const Renderer = renderers[kind]

  return Renderer ? <Renderer {...section[lowerCase(kind)]} /> : null
}

const Message = styled(({ className, sender, readStatus, sections }) => (
  <MessageWrapper className={className} sender={sender && sender.source}>
    {sections.map((section, i) => <Section key={i} {...section} />)}
  </MessageWrapper>
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
