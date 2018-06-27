import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import withData from '../../components/with-data'
import Master from '../../components/layout'
import { ButtonLink } from '../../components/button'
import { Heading, H1, Sidenav } from './components'
import { SometimesConversation } from './conversation'
import * as Compose from './compose'
import * as RequestCall from './request-call'

const queryMe = gql`
  query($userID: ID!) {
    user(where: { id: $userID }) {
      name
      id
      conversations {
        id
        createdAt
        subject
        service {
          name
          description
          contactNo
          agency {
            name
          }
        }
        messages {
          readStatus
          sentAt
          readAt
          sender {
            source
            user {
              id
              name
            }
            service {
              id
              name
            }
          }
          sections {
            kind
            markdown {
              source
            }
            document {
              filename
            }
            requestDocument {
              linkText
            }
            requestPayment {
              amountInCents
              linkText
            }
            requestScheduledPayment {
              amountInCents
              linkText
            }
            requestCall {
              linkText
            }
          }
        }
      }
    }
  }
`

const Help = styled.section`
  text-align: center;
  margin: 5em 0;
  opacity: 0.6;
`

const Homepage = ({ user: { conversations, name, id }, match, history }) => (
  <Switch>
    <Route
      exact
      path={`${match.path}/compose`}
      render={() => (
        <Compose.Page
          match={match}
          history={history}
          userID={id}
          conversations={conversations}
        />
      )}
    />

    <Route
      exact
      path={`${match.path}/:id/book-a-call`}
      render={({ match }) => (
        <RequestCall.Page match={match} history={history} />
      )}
    />

    <Route
      render={() => (
        <Fragment>
          <Heading>
            <H1>Message centre</H1>
            <ButtonLink to={`${match.path}/compose`} color="black">
              Start new message
            </ButtonLink>
          </Heading>

          <Master
            side={
              <Sidenav
                conversations={conversations}
                match={match}
                history={history}
              />
            }
          >
            <Switch>
              <Route
                exact
                path={`${match.path}/:id`}
                render={({ match }) => (
                  <SometimesConversation
                    conversation={conversations.find(
                      conv => conv.id === match.params.id
                    )}
                  />
                )}
              />
              <Route
                render={props => (
                  <Help>
                    <h2>No conversation selected</h2>
                    <p>
                      Choose a conversation from the side bar to get started.
                    </p>
                  </Help>
                )}
              />
            </Switch>
          </Master>
        </Fragment>
      )}
    />
  </Switch>
)

const withUserMessages = graphql(queryMe, {
  options: route => {
    return { variables: { userID: route.user.id } }
  },
})(withData(Homepage))

export { withUserMessages as default, Homepage }
