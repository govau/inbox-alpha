import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'

import withData from '../../components/with-data'
import Master from '../../components/layout'
import Icon from '../../components/icon'
import IconLink from '../../components/icon-link'
import Message from './message'
import { Messages } from './components'

const queryMe = gql`
  query($userID: ID!) {
    user(where: { id: $userID }) {
      name
      id
      messages {
        subject
        body

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

const Navlink = styled(IconLink)`
  color: ${props => props.theme.copyColour};

  ${props =>
    props.active
      ? css`
          font-weight: bold;
        `
      : ``} & span {
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
        <Navlink active to="/todo" icon={<Icon>inbox</Icon>}>
          Messages
        </Navlink>
      </Navitem>
      <Navitem>
        <Navlink to="/todo" icon={<Icon>done</Icon>}>
          Done
        </Navlink>
      </Navitem>
      <Navitem>
        <Navlink to="/todo" icon={<Icon>flag</Icon>}>
          Priority
        </Navlink>
      </Navitem>
    </Navlist>
  </nav>
)

const Homepage = ({ name, id, messages }) => (
  <Master side={<Sidenav />}>
    <h1>Messages</h1>

    <Messages>
      {messages.map((msg, i) => <Message key={i} msg={msg} />)}
    </Messages>
  </Master>
)

const withUserMessages = graphql(queryMe, {
  options: route => {
    return { variables: { userID: route.user.id } }
  },
})(withData(Homepage, ({ user }) => user))

export { withUserMessages as default, Homepage }
