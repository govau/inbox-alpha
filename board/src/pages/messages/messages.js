import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import Master from '../../components/layout'
import { ButtonLink } from '../../components/button'
import { Heading, Search, H1 } from './components'
import Sidenav from './sidenav'
import { Checkbox, Dropdown, Option } from '../../components/forms'
import { SometimesConversation } from './conversation'
import IconLink from '../../components/icon-link'
import Icon from '../../components/icon'

const Help = styled.section`
  text-align: center;
  margin: 5em 0;
  opacity: 0.6;
`

const FilterPanel = styled.section`
  background-color: #eee;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;

  ${Search} + * {
    margin-left: 3rem;
  }

  > * + * {
    margin-top: 0;
    margin-left: 2rem;
  }
`

const PullRightDropdown = styled(Dropdown)`
  margin-left: auto;
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

const isEmpty = set => [...set].length === 0

const doNothing = () => {}

const BlackIconLink = styled(IconLink)`
  color: black;

  &:visited {
    color: black;
  }
`

const ApplyLabel = ({
  label,
  children,
  conversations,
  onCompleted = doNothing,
  selectedConversationIDs = new Set(),
}) => {
  let c

  const selected = [...selectedConversationIDs].every(
    conversationID =>
      (conversations.find(conversation => conversation.id === conversationID) ||
        {})[label]
  )

  return (
    <Mutation
      mutation={setLabels}
      onCompleted={e => {
        c.resetStore()
        onCompleted()
      }}
    >
      {(change, { loading, error, data, client }) => {
        c = client

        return children(selected, ({ icon, ...props }) => (
          <BlackIconLink
            to="/messages"
            onClick={e => {
              e.preventDefault()
              change({
                variables: {
                  conversationIDs: [...selectedConversationIDs],
                  [label]: !selected,
                },
              })
            }}
            icon={<Icon>{icon}</Icon>}
            {...props}
          />
        ))
      }}
    </Mutation>
  )
}

class Messages extends Component {
  state = { selectedConversationIDs: new Set() }

  render() {
    const { conversations, label = null, match, history } = this.props

    return (
      <Fragment>
        <Heading>
          <div>
            <H1>Message centre</H1>
          </div>
          <ButtonLink to="/messages/compose" color="black">
            Start new message
          </ButtonLink>
        </Heading>

        <FilterPanel>
          <Search
            onChange={e => {
              const search = e.target.value ? e.target.value : null
              this.setState(() => ({ search }))
            }}
            placeholder="Search for a conversation"
          />

          <Checkbox
            onChange={e => {
              const editModeActive = e.target.checked
              this.setState(() => ({ editModeActive }))
            }}
            checked={this.state.editModeActive || false}
            label="Select messages"
          />

          {isEmpty(this.state.selectedConversationIDs) ? null : (
            <Fragment>
              <ApplyLabel
                label="starred"
                conversations={conversations}
                selectedConversationIDs={this.state.selectedConversationIDs}
              >
                {(selected, ActionIconLink) =>
                  selected ? (
                    <ActionIconLink icon="star">Unstar</ActionIconLink>
                  ) : (
                    <ActionIconLink icon="star_outline">Star</ActionIconLink>
                  )
                }
              </ApplyLabel>

              <ApplyLabel
                label="archived"
                onCompleted={() => {
                  this.setState(() => ({
                    editModeActive: false,
                    selectedConversationIDs: new Set(),
                  }))
                  history.push(match.path)
                }}
                conversations={conversations}
                selectedConversationIDs={this.state.selectedConversationIDs}
              >
                {(selected, ActionIconLink) =>
                  selected ? (
                    <ActionIconLink icon="vertical_align_top">
                      Unarchive
                    </ActionIconLink>
                  ) : (
                    <ActionIconLink icon="vertical_align_bottom">
                      Archive
                    </ActionIconLink>
                  )
                }
              </ApplyLabel>
            </Fragment>
          )}

          <PullRightDropdown
            lite
            label="View by"
            value={label ? label : 'default'}
            onChange={e => {
              e.target.value === 'default'
                ? history.push('/messages')
                : history.push(`/messages/${e.target.value}`)
            }}
          >
            <Option value="default">Default</Option>
            <Option value="starred">Starred</Option>
            <Option value="archived">Archived</Option>
          </PullRightDropdown>
        </FilterPanel>

        <Master
          side={
            <Sidenav
              search={this.state.search}
              label={label}
              conversations={conversations.map(c => ({
                selected: this.state.selectedConversationIDs.has(c.id),
                ...c,
              }))}
              match={match}
              history={history}
              editModeActive={this.state.editModeActive}
              onSelectConversation={({ selected, conversation }) => {
                const selectedConversationIDs = new Set(
                  this.state.selectedConversationIDs
                )

                selected
                  ? selectedConversationIDs.add(conversation.id)
                  : selectedConversationIDs.delete(conversation.id)

                this.setState(() => ({ selectedConversationIDs }))
              }}
            />
          }
        >
          <Switch>
            <Route
              exact
              path={`${match.path}/:id`}
              render={({ match: innerMatch }) => (
                <SometimesConversation
                  prefix={match.path}
                  history={history}
                  conversation={conversations.find(
                    conv => conv.id === innerMatch.params.id
                  )}
                />
              )}
            />
            <Route
              render={props => (
                <Help>
                  <h2>No conversation selected</h2>
                  <p>Choose a conversation from the side bar to get started.</p>
                </Help>
              )}
            />
          </Switch>
        </Master>
      </Fragment>
    )
  }
}

export { Messages as default }
