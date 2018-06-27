import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Icon from '../../components/icon'

const makePaymentCall = gql`
  mutation(
    $conversationID: ID!
    $sentAt: String
    $transcript: String
    $paymentOptions: String
    $makePaymentWith: String
  ) {
    transcript: createMessage(
      data: {
        sentAt: $sentAt
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            { kind: Markdown, markdown: { create: { source: $transcript } } }
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
              markdown: { create: { source: $paymentOptions } }
            }
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

    assessmentSchedule: createMessage(
      data: {
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            {
              kind: Markdown
              markdown: { create: { source: $makePaymentWith } }
            }
            { kind: MakePayment }
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

const transcript = `
**Transcript from call**

Transaction ID: PUT TX ID HERE  
Wed 10 June at 18:45 (lasted 4 min 43 seconds)

**Centrelink agent**: *Hi Alex, how are you? Is this still a good time to call?*

**Alex**: *Yeah, No worries*

  ...


**Centrelink agent**: *Yes, that's fine we can do fortnightly payments. THat should be about $40 per fortnight, we'll send you a Notice of Assessment payment schedule with all the details. Ok, great. Have a good night. Bye*

[Read full transcript](/todo)
`

const paymentOptions = `
Hi Alex,

Your payment options for your 2017 Tax Assessment have been approved.

Amount owing: **$41.60 per fortnight**  

View your income tax Notice of Assessment payment schedule for more information.
`

const makePaymentWith = `
#### Make payment with

**Savings account**: x-6371 (preferred payment option)

Do you authorise the ATO to use your preferred payment option (set up in myGov) for any future payments?

**First payment**: 14 June 2018  
**Frequency**: Fortnightly  
**Last payment**: 20 June 2019
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
                          sentAt: new Date().toString(),
                          transcript,
                          paymentOptions,
                          makePaymentWith,
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
