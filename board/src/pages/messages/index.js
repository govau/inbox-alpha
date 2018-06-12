import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import withData from '../../components/with-data'
import Master from '../../components/layout'
import Icon from '../../components/icon'
import {
  Messages,
  Message,
  About,
  Subject,
  Sender,
  Features,
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

        documents {
          filename
          kind
          location
        }

        notices {
          description
          severity
        }

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
  <Master>
    <h1>Messages</h1>

    <Messages>
      {messages.map((msg, i) => (
        <Message key={i}>
          <About>
            <Subject>{msg.subject}</Subject>{' '}
            <Sender>{msg.sender.agency.name}</Sender>
          </About>

          <Features>
            {msg.notices.map((notice, i) => (
              <Lozenge
                overdue={notice.severity === 'Critical'}
                important={notice.severity === 'Important'}
                key={i}
              >
                {notice.description}
              </Lozenge>
            ))}
          </Features>

          <Features>
            {msg.documents.map((doc, i) => (
              <Document
                key={i}
                to={doc.location || '/todo'}
                icon={<Icon>{doc.kind || 'book'}</Icon>}
              >
                {doc.filename}
              </Document>
            ))}
          </Features>

          <Prompt>
            <Attachment />
            <Timestamp>09:48 AM</Timestamp>
          </Prompt>
        </Message>
      ))}
    </Messages>
  </Master>
)

const withUserMessages = graphql(queryMe, {
  options: route => {
    return { variables: { userID: route.user.id } }
  },
})(withData(Homepage, ({ user }) => user))

export { withUserMessages as default, Homepage }
