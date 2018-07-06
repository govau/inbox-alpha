import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import { Query } from '../../components/with-data'
import Master from '../../components/layout'
import { ButtonLink } from '../../components/button'
import { Heading, Search, H1 } from './components'
import Sidenav from './sidenav'
import { SometimesConversation } from './conversation'
import * as Compose from './compose'
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
        labels
        service {
          name
          description
          contactNo
          agency {
            name
          }
        }
        messages(orderBy: createdAt_DESC) {
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

const Help = styled.section`
  text-align: center;
  margin: 5em 0;
  opacity: 0.6;
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
              component={RequestCall}
            />

            <Route
              render={() => (
                <Fragment>
                  <Heading>
                    <div>
                      <H1>Message centre</H1>
                      <Search
                        onChange={e => {
                          const search = e.target.value ? e.target.value : null
                          this.setState(() => ({ search }))
                        }}
                        placeholder="Search for a conversation"
                      />
                    </div>
                    <ButtonLink to={`${match.path}/compose`} color="black">
                      Start new message
                    </ButtonLink>
                  </Heading>

                  <Master
                    side={
                      <Sidenav
                        search={this.state.search}
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
                              Choose a conversation from the side bar to get
                              started.
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
        )}
      </Query>
    )
  }
}

export { Homepage as default }
