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

const Wrapper = styled.div`
  padding-left: 1rem;
`

const Subject = styled.div`
  margin-top: 0;
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  background-color: #f3f5f5;

  > * + * {
    margin-top: 0;
    margin-left: 1rem;
  }
`

const Conversations = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;

  ${MessageSection} {
    max-width: 60rem;
  }
`

const Code = styled.code`
  background-color: #dcdcdc;
  justify-self: flex-end;
  align-self: flex-start;
`

// generate a bogus case number for this conversation
const refNo = conversation =>
  `${conversation.service.agency.name
    .substring(0, 3)
    .toLowerCase()}-${conversation.id.slice(-8)}`

const Conversation = ({ className, conversation }) => (
  <Wrapper>
    <Subject className={className}>
      <div>To</div>
      <MessageContentWrapper>
        <MessageContent>
          <ShortSender>{conversation.service.name}</ShortSender>
          <ShortSubject>{conversation.subject}</ShortSubject>{' '}
        </MessageContent>
      </MessageContentWrapper>
      <Code>ref: {refNo(conversation)}</Code>
    </Subject>

    <Conversations>
      {conversation.messages.map((msg, i) => (
        <MessageSection key={i} {...msg} />
      ))}
    </Conversations>
  </Wrapper>
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
