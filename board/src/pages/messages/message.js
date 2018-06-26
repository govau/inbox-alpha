import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

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

const Actionables = styled.div`
  background-color: #f3f5f5;
  padding: 2em;
`

const markAsRead = gql`
  mutation($messageID: ID!) {
    updateMessage(where: { id: $messageID }, data: { readStatus: Read }) {
      id
      subject
      body
      readStatus
    }
  }
`

const MaybeReadMessage = ({ read, ...props }) =>
  read ? <ReadMessage {...props} /> : <Message {...props} />

/*
   *
          update={(cache, { data: { updateMessage } }) => {
            const { users } = cache.readQuery({ query: queryUsers })

            cache.writeQuery({
              query: queryUsers,
              data: { users: users.concat([createUser]) },
            })
            */

const FullMessage = ({ msg }) => (
  <Message>
    <SenderInfo>
      <SenderCircle image={msg.sender.agency.logo}>
        {msg.sender.agency.name.substring(0, 3)}
      </SenderCircle>
    </SenderInfo>

    <MessageContentWrapper>
      <MessageContent>
        <About>
          <Subject status={msg.readStatus}>{msg.subject}</Subject>
          <Sender status={msg.readStatus}>{msg.sender.agency.name}</Sender>
        </About>

        <Features>
          {msg.notices.map((notice, i) => (
            <Lozenge
              overdue={notice.severity === 'Critical'}
              important={notice.severity === 'Important'}
              information={notice.severity === 'Information'}
              key={i}
            >
              {notice.description}
            </Lozenge>
          ))}
        </Features>

        <Actionables>
          <Markdown source={msg.body} />
          <Features>
            {msg.documents.map((doc, i) => (
              <Document
                key={i}
                to={doc.location || '/todo/'}
                icon={<Icon>{doc.kind || 'book'}</Icon>}
              >
                {doc.filename}
              </Document>
            ))}
          </Features>

          {msg.tasks.map((task, i) => <Task key={i} {...task} />)}
        </Actionables>
        <Markdown
          className="more-information"
          source={msg.moreInformation || ''}
        />
      </MessageContent>

      <Prompt>
        <Timestamp>{msg.sent}</Timestamp>
      </Prompt>
    </MessageContentWrapper>
  </Message>
)

const ShortMessage = ({ msg, history }) => (
  <Mutation mutation={markAsRead}>
    {(markAsRead, { loading, error, data }) => (
      <MaybeReadMessage
        style={{ cursor: 'pointer' }}
        read={msg.readStatus === 'Read'}
        onClick={e => {
          markAsRead({
            variables: { messageID: msg.id },
          })
          history.push(`/messages/${msg.id}/`)
        }}
      >
        <SenderInfo>
          <SenderCircle image={msg.sender.agency.logo}>
            {msg.sender.agency.name.substring(0, 3)}
          </SenderCircle>
        </SenderInfo>

        <MessageContentWrapper>
          <MessageContent>
            <ShortSender status={msg.readStatus}>
              {msg.sender.agency.name}
            </ShortSender>
            <ShortSubject status={msg.readStatus}>{msg.subject}</ShortSubject>
          </MessageContent>

          <Prompt>
            <Timestamp>{msg.sent}</Timestamp>
          </Prompt>
        </MessageContentWrapper>
      </MaybeReadMessage>
    )}
  </Mutation>
)

const MaybeMessage = ({ msg }) => {
  return msg ? <FullMessage msg={msg} /> : <Error />
}

const Msg = ({ msg, ...props }) => (
  <Switch>
    <Route
      exact
      path={`/messages/${msg.id}/`}
      render={props => <ShortMessage msg={msg} {...props} />}
    />
    <Route
      exact
      path="/messages/"
      render={props => <FullMessage msg={msg} {...props} />}
    />
  </Switch>
)

export { Msg as default, FullMessage, ShortMessage, MaybeMessage }
