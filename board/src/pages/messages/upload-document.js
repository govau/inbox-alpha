import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import format from 'date-fns/format'
import gql from 'graphql-tag'

import FileInput from '../../components/file-input'

const uploadDocument = gql`
  mutation(
    $conversationID: ID!
    $filename: String!
    $sentAt: String
    $confirmation: String
    $nextSteps: String
  ) {
    uploaded: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sentAt: $sentAt
        sender: { create: { source: User } }
        sections: {
          create: [
            { kind: Document, document: { create: { filename: $filename } } }
          ]
        }
      }
    ) {
      id
    }

    confirmation: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sentAt: $sentAt
        sender: { create: { source: Service } }
        sections: {
          create: [
            {
              kind: Confirmation
              markdown: { create: { source: $confirmation } }
            }
          ]
        }
      }
    ) {
      id
    }

    nextSteps: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            { kind: Markdown, markdown: { create: { source: $nextSteps } } }
          ]
        }
      }
    ) {
      id
    }
  }
`

const confirmation = ({ now, filename }) => `
**Transaction ID**: CTR34256AS  
**File received**: ${now}  
**File name**: ${filename}
`

const nextSteps = `
#### Next steps

We will be in touch with you as soon as possible about your Rent Assistance payments.

Our current turnaround time is within 7 days.
`

const fmtdate = date => format(date, 'ddd D MMM YYYY, h:mm a')

export default ({ conversation }) => {
  let c

  return (
    <Route
      render={({ history }) => (
        <Mutation
          mutation={uploadDocument}
          onCompleted={e => {
            // so; this works. forces the page to reload its stuff I guess
            c.resetStore()
          }}
        >
          {(create, { loading, error, data, client }) => {
            c = client
            return (
              <Fragment>
                <FileInput
                  name="the-file-input"
                  onAttach={({ filename }) => {
                    create({
                      variables: {
                        conversationID: conversation.id,
                        filename,
                        sentAt: fmtdate(new Date()),
                        confirmation: confirmation({
                          now: fmtdate(new Date()),
                          filename,
                        }),
                        nextSteps,
                      },
                    })
                  }}
                />

                {loading ? (
                  <div>loading...</div>
                ) : error ? (
                  <details>
                    <summary>there was an error</summary>
                    {error.message}
                  </details>
                ) : null}
              </Fragment>
            )
          }}
        </Mutation>
      )}
    />
  )
}
