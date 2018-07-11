import React, { Fragment, Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Fuse from 'fuse.js'

import { Messages } from './components'
import { NewConversationLine, ConversationLine } from './conversation'

class Sidenav extends Component {
  state = {}

  render() {
    const {
      conversations,
      search,
      editModeActive,
      label,
      onSelectConversation,
      match,
      history,
    } = this.props
    let filtered = conversations

    filtered = label
      ? filtered.filter(conv => conv[label])
      : filtered.filter(conv => !conv.archived)

    filtered = search
      ? new Fuse(filtered, {
          shouldSort: true,
          tokenize: true,
          threshold: 0.01,
          includeScore: true,
          keys: [
            'subject',
            'service.name',
            'service.agency.name',
            'messages.sections.markdown.source',
            'messages.sections.document.filename',
            'messages.sections.markdown.source',
            'messages.sections.markdown.source',
          ],
        }).search(search)
      : filtered.map(item => ({ score: 0, item }))

    return (
      <Fragment>
        <Messages>
          <Switch>
            <Route
              exact
              path={`${match.path}/compose`}
              render={({ match }) => <NewConversationLine key={'compose'} />}
            />
          </Switch>
          {filtered.map(({ score, item: conv }, i) => (
            <ConversationLine
              data-score={score}
              key={i}
              conversation={conv}
              history={history}
              open={editModeActive}
              onSelectItem={e => {
                onSelectConversation({
                  selected: e.target.checked,
                  conversation: conv,
                })
              }}
            />
          ))}
        </Messages>
      </Fragment>
    )
  }
}

export { Sidenav as default }
