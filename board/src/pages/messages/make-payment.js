import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const makePayment = gql`
  mutation(
    $conversationID: ID!
    $sentAt: String
    $paymentAdvice: String
    $first: String
    $second: String
  ) {
    payment: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sentAt: $sentAt
        sender: { create: { source: User } }
        sections: {
          create: [
            { kind: Markdown, markdown: { create: { source: $paymentAdvice } } }
          ]
        }
      }
    ) {
      id
    }

    firstTransaction: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sentAt: "Wed 14 June 2018, 5:52PM"
        sender: { create: { source: Service } }
        sections: {
          create: [
            { kind: Confirmation, markdown: { create: { source: $first } } }
          ]
        }
      }
    ) {
      id
    }

    secondTransaction: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sentAt: "Wed 28 June 2018, 5:52PM"
        sender: { create: { source: Service } }
        sections: {
          create: [
            { kind: Confirmation, markdown: { create: { source: $second } } }
          ]
        }
      }
    ) {
      id
    }
  }
`

const paymentAdvice = `
#### Payment advice

**Pay**: ATO 75556 5679019789900  
**Amount**: $41.60  
**Pay with**: Savings account x-6371  
**Start date**: 14 June 2018  
**Frequency**: Fortnightly  
**Last payment**: 20 June 2019
`

const first = `
**Transaction ID**: ATO: ATO4565TYZPS1  
**Payment received**: Wed 14 June 2018, 5:52PM  
**Amount**: $41.60


~~Next payment due: Wed 28 June 2018, 5:52PM~~
`

const second = `
**Transaction ID**: ATO: ATO4565TYZPS2  
**Payment received**: Wed 28 June 2018, 5:52PM  
**Amount**: $41.60


~~Next payment due: Wed 12 July 2018, 5:52PM~~
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
                          sentAt: new Date().toString(),
                          paymentAdvice,
                          first,
                          second,
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
