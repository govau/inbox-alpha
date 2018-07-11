import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Route, Switch } from 'react-router-dom'

import { Query } from '../../components/with-data'
import Messages from './messages'
import RequestCall from './request-call'

const queryMe = gql`
  query($userID: ID!) {
    user(where: { id: $userID }) {
      name
      id
      conversations(orderBy: createdAt_DESC) {
        id
        createdAt
        subject
        starred
        archived
        service {
          name
          description
          contactNo
          agency {
            name
          }
        }
        messages(orderBy: createdAt_ASC) {
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
              agency {
                name
              }
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

class Homepage extends Component {
  state = {}

  render() {
    const { user, match, history } = this.props

    return (
      <Query query={queryMe} variables={{ userID: user.id }}>
        {({ user: { conversations, name, id } }) => (
          <Switch>
            <Route
              exact
              path={`${match.path}/:id/book-a-call`}
              component={RequestCall}
            />

            <Route
              path={`${match.path}/archived`}
              render={({ match, history }) => (
                <Messages
                  match={match}
                  history={history}
                  label="archived"
                  conversations={conversations}
                />
              )}
            />

            <Route
              path={`${match.path}/starred`}
              render={({ match, history }) => (
                <Messages
                  match={match}
                  history={history}
                  label="starred"
                  conversations={conversations}
                />
              )}
            />

            <Route
              render={() => (
                <Messages
                  match={match}
                  history={history}
                  conversations={conversations}
                />
              )}
            />
          </Switch>
        )}
      </Query>
    )
  }
}

export { Homepage as default }
