import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Icon from '../../components/icon'

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

const Calendar = styled.div`
  display: flex;
  flex-flow: row nowrap;

  & * + * {
    margin-top: 0;
  }

  > * + * {
    margin-left: 1rem;
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
              <div>
                <Calendar>
                  <Icon style={{ fontSize: '3em' }}>calendar_today</Icon>
                  <div>
                    <div>
                      <Link to="/todo">Download to add to calendar</Link>
                    </div>
                    <div>Booked_callback.ics 0.5KB</div>
                  </div>
                </Calendar>

                <p>
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
                    Reschedule appointment
                  </Link>
                </p>

                {loading ? (
                  <div>loading...</div>
                ) : error ? (
                  <details>
                    <summary>there was an error</summary>
                    {error.message}
                  </details>
                ) : null}
              </div>
            )
          }}
        </Mutation>
      )}
    />
  )
}
