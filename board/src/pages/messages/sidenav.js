import React, { Fragment, Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Fuse from 'fuse.js'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Messages } from './components'
import { NewConversationLine, ConversationLine } from './conversation'
import { Checkbox, Dropdown, FormGroup, Option } from '../../components/forms'
import IconLink from '../../components/icon-link'
import Icon from '../../components/icon'

const FlexFormGroup = styled(FormGroup)`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  & * + * {
    margin-top: 0;
  }
`

const setLabels = gql`
  mutation($conversationIDs: [ID!]!, $archived: Boolean, $starred: Boolean) {
    updateManyConversations(
      where: { id_in: $conversationIDs }
      data: { starred: $starred, archived: $archived }
    ) {
      count
    }
  }
`

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
    let c

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
