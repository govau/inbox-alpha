import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
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

const confirmation = now => `
**Transaction ID**: CTR34256AS  
**File received**: ${now}  
**File name**: FILE NAME HERE
`

const nextSteps = `
#### Next steps

We will be in touch with you as soon as possible about your Rent Assistance payments.

Our current turnaround time is within 7 days.
`

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
                <FileInput name="the-file-input" />
                <div>
                  <Link
                    to="/todo"
                    onClick={e => {
                      e.preventDefault()
                      create({
                        variables: {
                          conversationID: conversation.id,
                          filename: 'this-is-the-filename',
                          sentAt: new Date().toString(),
                          confirmation: confirmation(new Date().toString()),
                          nextSteps,
                        },
                      })
                    }}
                  >
                    upload the document
                  </Link>
                </div>

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
