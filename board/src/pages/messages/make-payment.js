import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const makePayment = gql`
  mutation($conversationID: ID!) {
    payment: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: User } }
        sections: {
          create: [
            {
              kind: Markdown
              markdown: { create: { source: "here. take my money" } }
            }
          ]
        }
      }
    ) {
      id
    }

    firstTransaction: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            {
              kind: Markdown
              markdown: { create: { source: "this is the first transaction" } }
            }
          ]
        }
      }
    ) {
      id
    }

    secondTransaction: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            {
              kind: Markdown
              markdown: { create: { source: "this is the second transaction" } }
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
          mutation={makePayment}
          onCompleted={e => {
            // so; this works. forces the page to reload its stuff I guess
            c.resetStore()
          }}
        >
          {(create, { loading, error, data, client }) => {
            c = client
            return (
              <Fragment>
                <div>
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
                    Pay now
                  </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/todo">Change</Link>
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
