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
    const { conversations, search, match, history } = this.props
    let filtered = conversations
    let c

    filtered = this.state.label
      ? filtered.filter(conv => conv[this.state.label])
      : filtered.filter(conv => !conv.archived)

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
          <FlexFormGroup>
            <Checkbox
              onChange={e => {
                const editModeActive = e.target.checked
                this.setState(() => ({ editModeActive }))
              }}
              label="Select conversation"
            />
            <Dropdown
              onChange={e => {
                const label =
                  e.target.value === 'default' ? null : e.target.value
                this.setState(() => ({ label }))
              }}
            >
              <Option value="default">Default</Option>
              <Option value="starred">Starred</Option>
              <Option value="archived">Archived</Option>
            </Dropdown>
          </FlexFormGroup>
        </form>
        {this.state.editModeActive ? (
          <Mutation
            mutation={setLabels}
            onCompleted={e => {
              c.resetStore()
            }}
          >
            {(change, { loading, error, data, client }) => {
              c = client
              return (
                <section>
                  <div>
                    <IconLink
                      to={`/messages`}
                      onClick={e => {
                        e.preventDefault()
                        change({
                          variables: {
                            conversationIDs: filtered.map(
                              ({ item: conv }) => conv.id
                            ),
                            starred: true,
                          },
                        })
                      }}
                      icon={<Icon>star_outline</Icon>}
                    >
                      Star
                    </IconLink>
                  </div>
                  <div>
                    <IconLink
                      to={`/messages`}
                      onClick={e => {
                        e.preventDefault()
                        change({
                          variables: {
                            conversationIDs: filtered.map(
                              ({ item: conv }) => conv.id
                            ),
                            archived: true,
                            starred: false,
                          },
                        })
                      }}
                      icon={<Icon>archive</Icon>}
                    >
                      Archive
                    </IconLink>
                  </div>
                </section>
              )
            }}
          </Mutation>
        ) : null}
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
              open={this.state.editModeActive}
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
