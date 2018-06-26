import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import Section, { Message as MessageSection } from './section'
import { Error } from '../../components/error'
import Icon from '../../components/icon'
import Markdown from '../../components/markdown'
import Task from '../../components/task'
import {
  Message,
  ReadMessage,
  About,
  Subject,
  Sender,
  ShortSubject,
  ShortSender,
  SenderInfo,
  SenderCircle,
  MessageContent,
  MessageContentWrapper,
  Features,
  Lozenge,
  Document,
  Prompt,
  Timestamp,
} from './components'

const Conversation = ({ conversation: { subject, service, messages } }) => (
  <div>
    <div>{subject}</div>
    {messages.map((msg, i) => <MessageSection key={i} {...msg} />)}
  </div>
)

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
