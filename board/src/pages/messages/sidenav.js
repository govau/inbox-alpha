import React, { Fragment, Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Fuse from 'fuse.js'

import { Messages } from './components'
import { NewConversationLine, ConversationLine } from './conversation'
import { Checkbox, Dropdown, FormGroup, Option } from '../../components/forms'

class Sidenav extends Component {
  state = {}

  render() {
    const { conversations, search, match, history } = this.props
    let filtered = conversations

    if (this.state.label) {
      filtered = filtered.filter(conv =>
        conv.labels.find(label => label === this.state.label)
      )
    }

    filtered = search
      ? new Fuse(filtered, {
          shouldSort: true,
          tokenize: true,
          threshold: 0.01,
          includeScore: true,
          keys: [
            'subject',
            'messages.sender.name',
            'messages.sender.agency.name',
            'messages.sections.markdown.source',
            'messages.sections.document.filename',
            'messages.sections.markdown.source',
            'messages.sections.markdown.source',
          ],
        }).search(search)
      : filtered.map(item => ({ score: 0, item }))

    return (
      <Fragment>
        <form>
          <FormGroup>
            <Checkbox label="Select conversation" />
            <Dropdown
              onChange={e => {
                const label =
                  e.target.value === 'Default' ? null : e.target.value
                this.setState(() => ({ label }))
              }}
            >
              <Option value="Default">Default</Option>
              <Option value="Starred">Starred</Option>
              <Option value="Archived">Archived</Option>
            </Dropdown>
          </FormGroup>
        </form>
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
            />
          ))}
        </Messages>
      </Fragment>
    )
  }
}

export { Sidenav as default }
