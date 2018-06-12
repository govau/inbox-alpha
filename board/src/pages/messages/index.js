import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import withData from '../../components/with-data'
import Icon from '../../components/icon'
import {
  Messages,
  Message,
  About,
  Subject,
  Sender,
  Features,
  FlexFeatures,
  Lozenge,
  Document,
  Prompt,
  Attachment,
  Timestamp,
} from './components'

const queryMe = gql`
  query($userID: ID!) {
    user(where: { id: $userID }) {
      name
      id
      messages {
        subject
        body

        sender {
          name
          description

          agency {
            name
          }
        }
      }
    }
  }
`

const Homepage = ({ name, id, messages }) => (
  <Fragment>
    <h1>Messages</h1>

    <Messages>
      {messages.map((msg, i) => (
        <Message key={i}>
          <About>
            <Subject>{msg.subject}</Subject>{' '}
            <Sender>{msg.sender.agency.name}</Sender>
          </About>

          <Features>
            <Lozenge overdue>Payment overdue!</Lozenge>
            <Lozenge important>Lodge form by 29 June 2018</Lozenge>
            <Lozenge important>Provide more documents</Lozenge>
          </Features>

          <FlexFeatures>
            <Document to="/todo" icon={<Icon>book</Icon>}>
              2017 Notice of Assesment
            </Document>
            <Document to="/todo" icon={<Icon>calendar_today</Icon>}>
              Click to download calendar invite
            </Document>
            <Document to="/todo" icon={<Icon>book</Icon>}>
              2017 Notice of Assesment
            </Document>
          </FlexFeatures>

          <Prompt>
            <Attachment />
            <Timestamp>09:48 AM</Timestamp>
          </Prompt>
        </Message>
      ))}
    </Messages>
  </Fragment>
)

const withUserMessages = graphql(queryMe, {
  options: route => {
    return { variables: { userID: route.user.id } }
  },
})(withData(Homepage, ({ user }) => user))

export { withUserMessages as default, Homepage }
