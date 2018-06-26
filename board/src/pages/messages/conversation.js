import React from 'react'
import styled from 'styled-components'

import { Message as MessageSection } from './section'
import { Error } from '../../components/error'
import {
  Message,
  ShortSubject,
  ShortSender,
  SenderInfo,
  SenderCircle,
  MessageContent,
  MessageContentWrapper,
} from './components'

const Conversation = styled(
  ({ className, conversation: { subject, service, messages } }) => (
    <div className={className}>
      <div>{subject}</div>
      {messages.map((msg, i) => <MessageSection key={i} {...msg} />)}
    </div>
  )
)`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;

  ${MessageSection} {
    max-width: 60rem;
  }
`

const ConversationLine = ({ conversation, history }) => (
  <Message
    style={{ cursor: 'pointer' }}
    onClick={e => {
      history.push(`/messages/${conversation.id}`)
    }}
  >
    <SenderInfo>
      <SenderCircle image={conversation.service.agency.logo}>
        {conversation.service.agency.name.substring(0, 3)}
      </SenderCircle>
    </SenderInfo>

    <MessageContentWrapper>
      <MessageContent>
        <ShortSender>{conversation.service.agency.name}</ShortSender>
        <ShortSubject>{conversation.subject}</ShortSubject>
      </MessageContent>
    </MessageContentWrapper>
  </Message>
)

const SometimesConversation = props => {
  return props.conversation ? <Conversation {...props} /> : <Error />
}

export {
  Conversation as default,
  Conversation,
  ConversationLine,
  SometimesConversation,
}
