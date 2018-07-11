import React, { Fragment } from 'react'
import format from 'date-fns/format'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Checkbox } from '../../components/forms'
import Counter from '../../components/counter'
import { Message as MessageSection } from './section'
import { Error } from '../../components/error'
import IconLink from '../../components/icon-link'
import Icon from '../../components/icon'
import {
  Message,
  ShortSender,
  ShortSubject,
  SenderInfo,
  SenderCircle,
  MessageContent,
  MessageContentWrapper,
} from './components'

const Timestamp = styled.time`
  opacity: 0.7;
  font-size: 0.8em;
  margin-top: 0;
`

export const NewConversationLine = () => (
  <Message active={true}>
    <SenderInfo>
      <SenderCircle>&nbsp;&nbsp;?&nbsp;&nbsp;</SenderCircle>
    </SenderInfo>

    <MessageContentWrapper>
      <MessageContent>
        <ShortSender>New message</ShortSender>
        <ShortSubject />
      </MessageContent>
    </MessageContentWrapper>
  </Message>
)

const CounterSenderCircle = Counter(SenderCircle)

const markAsRead = gql`
  mutation($conversationID: ID!, $now: String) {
    updateManyMessages(
      where: { conversation: { id: $conversationID } }
      data: { readStatus: Read, readAt: $now }
    ) {
      count
    }
  }
`

const ConversationLine = ({
  conversation,
  match,
  history,
  onSelectItem,
  open = false,
}) => {
  let c
  const count = conversation.messages.filter(msg => msg.readStatus !== 'Read')
    .length

  return (
    <Mutation
      mutation={markAsRead}
      onCompleted={e => {
        c.resetStore()
      }}
    >
      {(markAsRead, { loading, error, data, client }) => {
        c = client

        return (
          <Message
            active={
              history.location.pathname === `${match.path}/${conversation.id}`
            }
          >
            {open ? (
              <Checkbox
                checked={conversation.selected}
                onChange={onSelectItem}
              />
            ) : null}

            <SenderInfo>
              <CounterSenderCircle
                reversed
                image={conversation.service.agency.logo}
                data-count={count ? count : ''}
              >
                {conversation.service.agency.name.substring(0, 2)}
              </CounterSenderCircle>
            </SenderInfo>

            <MessageContentWrapper
              style={{ cursor: 'pointer' }}
              onClick={e => {
                markAsRead({
                  variables: {
                    conversationID: conversation.id,
                    now: new Date().toString(),
                  },
                })
                history.push(`${match.path}/${conversation.id}`)
              }}
            >
              <MessageContent>
                <ShortSender unread={!!count}>
                  {conversation.service.agency.name}
                </ShortSender>
                <ShortSubject unread={!!count}>
                  {conversation.subject}
                </ShortSubject>
                <Timestamp dateTime={conversation.createdAt}>
                  {format(conversation.createdAt, 'ddd D MMM YYYY, h:mm a')}
                </Timestamp>
              </MessageContent>
            </MessageContentWrapper>

            {conversation.starred ? <Icon>star</Icon> : null}
          </Message>
        )
      }}
    </Mutation>
  )
}

const Wrapper = styled.div`
  margin-left: 1rem;
  padding-bottom: 4rem;
  border: 1px solid #cccccc;
  min-height: 65vh;
`

const Subject = styled.div`
  margin-top: 0;
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
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
    max-width: 55rem;
  }
`
const BlackIconLink = styled(IconLink)`
  color: black;

  &:visited {
    color: black;
  }
`

const setLabels = gql`
  mutation($conversationIDs: [ID!]!, $archived: Boolean, $starred: Boolean) {
    updateManyConversations(
      where: { id_in: $conversationIDs }
      data: { starred: $starred, archived: $archived }
    ) {
      count
    }
  }
`

// generate a bogus case number for this conversation
const refNo = conversation =>
  `${conversation.service.agency.name
    .substring(0, 3)
    .toUpperCase()}${conversation.id.slice(-8).toUpperCase()}`

// to={`${match.path}/${conversation.id}`}
const ConversationLabel = ({
  conversation,
  mutation,
  label,
  icon,
  inverse,
  match,
  children,
}) => (
  <BlackIconLink
    to="/messages"
    onClick={e => {
      e.preventDefault()
      mutation({
        variables: {
          conversationIDs: conversation.id,
          [label]: !conversation[label],
        },
      })
    }}
    icon={<Icon>{conversation[label] ? icon : inverse}</Icon>}
  />
)

const Conversation = ({ className, conversation }) => {
  let c

  return (
    <Wrapper>
      <Subject className={className}>
        <SenderCircle image={conversation.service.agency.logo}>
          {conversation.service.agency.name.substring(0, 2)}
        </SenderCircle>

        <MessageContentWrapper>
          <MessageContent>
            <ShortSender>{conversation.service.agency.name}</ShortSender>
            <ShortSubject>
              {conversation.subject} Case ID: {refNo(conversation)}
            </ShortSubject>
          </MessageContent>
        </MessageContentWrapper>

        <Mutation
          mutation={setLabels}
          onCompleted={e => {
            c.resetStore()
          }}
        >
          {(change, { loading, error, data, client }) => {
            c = client

            return (
              <Fragment>
                <ConversationLabel
                  conversation={conversation}
                  mutation={change}
                  label="starred"
                  icon="star"
                  inverse="star_border"
                />
                <ConversationLabel
                  conversation={conversation}
                  mutation={change}
                  label="archived"
                  icon="vertical_align_top"
                  inverse="vertical_align_bottom"
                />
              </Fragment>
            )
          }}
        </Mutation>
      </Subject>

      <Conversations>
        {conversation.messages.map((msg, i) => (
          <MessageSection key={i} conversation={conversation} message={msg} />
        ))}
      </Conversations>
    </Wrapper>
  )
}

const SometimesConversation = props => {
  return props.conversation ? <Conversation {...props} /> : <Error />
}

export {
  Conversation as default,
  Conversation,
  ConversationLine,
  SometimesConversation,
}
