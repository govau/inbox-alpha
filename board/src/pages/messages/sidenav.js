import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Search, Messages } from './components'
import { NewConversationLine, ConversationLine } from './conversation'

const Sidenav = ({ conversations, match, history }) => (
  <Fragment>
    <Search placeholder="Search your messages" />
    <Messages>
      <Switch>
        <Route
          exact
          path={`${match.path}/compose`}
          render={({ match }) => <NewConversationLine key={'compose'} />}
        />
      </Switch>
      {conversations.map((conv, i) => (
        <ConversationLine key={i} conversation={conv} history={history} />
      ))}
    </Messages>
  </Fragment>
)

export { Sidenav as default }
