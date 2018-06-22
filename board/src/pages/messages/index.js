import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import markdownify from 'draftjs-to-markdown'

import withData from '../../components/with-data'
import Master from '../../components/layout'
import Icon from '../../components/icon'
import IconLink from '../../components/icon-link'
import { Text } from '../../components/forms'
import Editor from '../../components/editor'
import Markdown from '../../components/markdown'
import Message from './message'
import { Messages } from './components'

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

const Navlist = styled.ul`
  list-style: none;
  padding: 0;
`

const Navlink = styled(({ active, ...props }) => <IconLink {...props} />)`
  color: ${props => props.theme.copyColour};

  ${props =>
    props.active
      ? css`
          font-weight: bold;
        `
      : ``};

  & span {
    margin-left: 0.5em;
  }

  span {
    text-decoration: none;
  }
`

const Navitem = styled.li``

const Sidenav = props => (
  <nav {...props}>
    <Navlist>
      <Navitem>
        <Navlink to="/messages/compose" icon={<Icon>create</Icon>}>
          Compose
        </Navlink>
      </Navitem>
      <Navitem>
        <Navlink to="/messages" icon={<Icon>inbox</Icon>}>
          Messages
        </Navlink>
      </Navitem>
    </Navlist>
  </nav>
)

const Heading = styled.header`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    * + * {
      margin-top: 0;
    }
  }

  & + ${Messages} {
    margin-top: 2em;
  }
`

const H1 = styled.h1`
  @media screen and (min-width: 768px) {
    flex: 1;
  }
`

const Search = styled(Text)`
  @media screen and (min-width: 768px) {
    flex: 2;
  }
`

class Homepage extends Component {
  state = { editorContent: '' }

  setEditorContent = editorContent => {
    this.setState({
      ...this.state,
      editorContent,
    })
  }

  render() {
    const { messages } = this.props

    return (
      <Switch>
        <Route
          exact
          path="/messages/compose"
          render={() => (
            <Master side={<Sidenav />}>
              <Heading>
                <H1>Message centre</H1>
              </Heading>

              <Editor
                onContentStateChange={contentState => {
                  this.setEditorContent(markdownify(contentState))
                }}
              />
              <hr />

              <Markdown source={this.state.editorContent} />
            </Master>
          )}
        />
        <Route
          render={() => (
            <Master side={<Sidenav />}>
              <Heading>
                <H1>Messages</H1>
                <Search placeholder="Begin typing to search..." />
              </Heading>

              <Route
                exact
                path="/messages/:id"
                render={() => (
                  <IconLink to="/messages" icon={<Icon>arrow_back</Icon>}>
                    Back
                  </IconLink>
                )}
              />

              <Messages>
                {messages.map((msg, i) => <Message key={i} msg={msg} />)}
              </Messages>
            </Master>
          )}
        />
      </Switch>
    )
  }
}

const withUserMessages = graphql(queryMe, {
  options: route => {
    return { variables: { userID: route.user.id } }
  },
})(withData(Homepage, ({ user }) => user))

export { withUserMessages as default, Homepage }
