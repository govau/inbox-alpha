import React, { Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const makePaymentCall = gql`
  mutation($conversationID: ID!) {
    transcript: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            {
              kind: Markdown
              markdown: { create: { source: "transcript goes here" } }
            }
          ]
        }
      }
    ) {
      id
    }

    paymentOptions: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            {
              kind: Markdown
              markdown: { create: { source: "payment options go here" } }
            }
            { kind: MakePayment }
          ]
        }
      }
    ) {
      id
    }

    assessmentSchedule: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            {
              kind: Document
              document: {
                create: { filename: "Notice of assessment payment schedule" }
              }
            }
          ]
        }
      }
    ) {
      id
    }
  }
`

export default ({ conversation }) => {
  let c

  return (
    <Route
      render={({ history }) => (
        <Mutation
          mutation={makePaymentCall}
          onCompleted={e => {
            // so; this works. forces the page to reload its stuff I guess
            c.resetStore()
          }}
        >
          {(create, { loading, error, data, client }) => {
            c = client
            return (
              <Fragment>
                <Link
                  to="/todo"
                  onClick={e => {
                    e.preventDefault()
                    create({
                      variables: {
                        conversationID: conversation.id,
                      },
                    })
                  }}
                >
                  Start the call
                </Link>

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
