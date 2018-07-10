import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import { Query } from '../../components/with-data'
import Master from '../../components/layout'
import { ButtonLink } from '../../components/button'
import { Heading, Search, H1 } from './components'
import Sidenav from './sidenav'
import { Checkbox, Dropdown, FormGroup, Option } from '../../components/forms'
import { SometimesConversation } from './conversation'
import * as Compose from './compose'
import RequestCall from './request-call'
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

class Messages extends Component {
  state = {}

  render() {
    const { conversations, match, history } = this.props

    return (
      <Fragment>
        <Heading>
          <div>
            <H1>Message centre</H1>
          </div>
          <ButtonLink to={`${match.path}/compose`} color="black">
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

          <Checkbox label="Select messages" />
          <IconLink to={`/messages`} icon={<Icon>star_outline</Icon>}>
            Star
          </IconLink>
          <IconLink to={`/messages`} icon={<Icon>archive</Icon>}>
            Archive
          </IconLink>

          <PullRightDropdown lite label="View by">
            <Option value="default">Default</Option>
            <Option value="starred">Starred</Option>
            <Option value="archived">Archived</Option>
          </PullRightDropdown>
        </FilterPanel>

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
