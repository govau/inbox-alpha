import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import withData from '../../components/with-data'
import Master from '../../components/layout'
import Icon from '../../components/icon'
import IconLink from '../../components/icon-link'
import { ButtonLink } from '../../components/button'
import { Text } from '../../components/forms'
import Compose from './compose'
import { ShortMessage, MaybeMessage } from './message'
import { Heading, H1, Messages } from './components'
import * as RequestCall from './request-call'

const queryMe = gql`
  query($userID: ID!) {
    user(where: { id: $userID }) {
      name
      id
      messages {
        id
        subject
        body
        moreInformation
        readStatus
        sent

        tasks {
          id
          instruction
          task
          paymentAmount
        }

        documents {
          filename
          kind
          location
        }

        notices {
          description
          severity
        }

        sender {
          name
          description
          contactNo
          agency {
            name
            logo {
              url
              title
            }
          }
        }
      }
    }
  }
`

const Search = styled(Text)`
  @media screen and (min-width: 768px) {
    flex: 2;
  }
`

const Help = styled.section`
  text-align: center;
  margin: 5em 0;
  opacity: 0.6;
`

const Sidenav = ({ messages, history }) => (
  <Fragment>
    <Search placeholder="Search your messages" />
    <Messages>
      {messages.map((msg, i) => (
        <ShortMessage key={i} msg={msg} history={history} />
      ))}
    </Messages>
  </Fragment>
)

const Homepage = ({ messages, match, history }) => (
  <Switch>
    <Route
      exact
      path={`${match.path}:id/book-a-call/`}
      render={({ match }) => (
        <RequestCall.Page match={match} history={history} />
      )}
    />

    <Route
      render={() => (
        <Fragment>
          <Heading>
            <H1>Message centre</H1>
            <ButtonLink to={`${match.path}compose/`}>
              Start new message
            </ButtonLink>
          </Heading>

          <Master side={<Sidenav messages={messages} history={history} />}>
            <Switch>
              <Route exact path={`${match.path}compose/`} component={Compose} />
              <Route
                exact
                path={`${match.path}:id/`}
                render={({ match }) => (
                  <Fragment>
                    <IconLink to="/messages/" icon={<Icon>arrow_back</Icon>}>
                      Back
                    </IconLink>

                    <MaybeMessage
                      msg={messages.find(msg => msg.id === match.params.id)}
                    />
                  </Fragment>
                )}
              />

              <Route
                render={props => (
                  <Help>
                    <h2>No message selected</h2>
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
})(withData(Homepage, ({ user }) => user))

export { withUserMessages as default, Homepage }
