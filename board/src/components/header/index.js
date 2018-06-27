import React, { Fragment } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled, { css, ThemeProvider } from 'styled-components'

import logo from './mygov.svg'
import Icon from '../icon'
import Toggle from '../toggle'
import { header as headerTheme, button as buttonTheme } from '../mygov'

const Hamburger = styled(Icon)`
  cursor: pointer;
`

const Header = styled.header`
  background-color: ${props => props.theme.backgroundColour};
  color: ${props => props.theme.copyColour};
  margin-top: 0;

  a,
  a:visited {
    color: ${props => props.theme.copyColour};
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
    ${Hamburger} {
      display: none;
    }
  }
`

const ButtonLink = styled(Link)`
  padding: 1rem 1em;
  text-align: center;
  display: block;

  @media screen and (min-width: 768px) {
    display: auto;
  }
`

const Headeritem = styled.li`
  ${ButtonLink}, ${ButtonLink}:visited {
    color: ${props => props.theme.copyColour};
    background-color: ${props => props.theme.backgroundColour};
  }

  @media screen and (min-width: 768px) {
    margin: 0;
    padding: 1rem 2rem;
  }
`

const Navitem = styled.li`
  margin: 0;
  margin-left: -2rem;
  margin-right: -2rem;
  padding: 1rem 2rem;

  ${props =>
    props.active
      ? css`
          font-weight: bold;
          border-left: 6px solid ${props => props.theme.highlight};
          padding-left: calc(2rem - 6px);
        `
      : css``};

  @media screen and (min-width: 768px) {
    margin: 0;
    padding: 2rem;

    ${props =>
      props.active
        ? css`
            border-left: none;
            border-top: 6px solid ${props => props.theme.highlight};
            padding-top: calc(2rem - 6px);
          `
        : css``};
  }
`

const IndicatorLink = styled(Link)`
  position: relative;
  z-index: 1;

  &::after {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    background-color: #ff5d81;
    color: #fff;
    font-size: 0.65em;
    top: -0.5em;
    right: -1.8em;
    padding: 0 0.5em;
    content: attr(data-count);
  }
`

const Nav = styled.nav`
  margin-top: 0;

  ${({ active }) =>
    active
      ? css``
      : css`
          display: none;
        `};

  @media screen and (min-width: 768px) {
    display: inherit;
  }
`

const Navlist = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  margin: 0 auto;
  list-style: none;

  @media screen and (min-width: 768px) {
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;

    ${Headeritem}:last-child {
      padding-right: 0;
    }
  }
`

const SecondaryNavlist = Navlist.extend`
  margin: 0;

  @media screen and (min-width: 768px) {
    padding: 0;
    justify-content: flex-start;

    ${Navitem}:first-child {
      padding-left: 0;
    }
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const Controls = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  padding-top: 1rem;
  padding-bottom: 1rem;

  & * + * {
    margin-top: 0;
  }
`

const HeaderLink = ({ link: Component = Link, ...props }) => (
  <Headeritem>
    <Component {...props} />
  </Headeritem>
)

const Navlink = ({ link: Component = Link, to, ...props }) => (
  <Switch>
    <Route
      exact={to === '/'}
      path={to}
      render={() => (
        <Navitem active>
          <Component to={to} {...props} />
        </Navitem>
      )}
    />
    <Route
      render={() => (
        <Navitem>
          <Component to={to} {...props} />
        </Navitem>
      )}
    />
  </Switch>
)

const queryMessages = gql`
  query($userID: ID!) {
    user(where: { id: $userID }) {
      conversations {
        messages {
          readStatus
        }
      }
    }
  }
`

const flatMap = fx => xs => Array.prototype.concat(...xs.map(fx))

const MinimalHeader = () => (
  <ThemeProvider theme={headerTheme}>
    <Header>
      <HeaderWrapper
        style={{
          padding: '2em',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Link to="/">
          <img
            src={logo}
            style={{ height: '4rem', marginTop: '1rem' }}
            alt="myGov logo"
          />
        </Link>
      </HeaderWrapper>
    </Header>
  </ThemeProvider>
)

const LoggedOutHeader = () => (
  <Toggle>
    {({ on, toggle, deactivate }) => (
      <ThemeProvider theme={headerTheme}>
        <Header>
          <HeaderWrapper className="wrap-sides">
            <Controls>
              <Link onClick={deactivate} to="/">
                <img
                  src={logo}
                  style={{ height: '4rem', marginTop: '1rem' }}
                  alt="myGov logo"
                />
              </Link>
              {on ? (
                <Hamburger onClick={toggle}>close</Hamburger>
              ) : (
                <Hamburger onClick={toggle}>menu</Hamburger>
              )}
            </Controls>

            <Nav active={on}>
              <Navlist>
                <HeaderLink onClick={deactivate} to="/todo">
                  Help
                </HeaderLink>
                <ThemeProvider theme={buttonTheme}>
                  <HeaderLink
                    link={ButtonLink}
                    onClick={deactivate}
                    to="/login"
                  >
                    Sign in
                  </HeaderLink>
                </ThemeProvider>
              </Navlist>
            </Nav>
          </HeaderWrapper>
        </Header>
      </ThemeProvider>
    )}
  </Toggle>
)

const StickyHeader = ({ user }) => (
  <Toggle>
    {({ on, toggle, deactivate }) => (
      <Fragment>
        <ThemeProvider theme={headerTheme}>
          <Header>
            <HeaderWrapper className="wrap-sides">
              <Controls>
                <Link onClick={deactivate} to="/">
                  <img
                    src={logo}
                    style={{ height: '4rem', marginTop: '1rem' }}
                    alt="myGov logo"
                  />
                </Link>
                {on ? (
                  <Hamburger onClick={toggle}>close</Hamburger>
                ) : (
                  <Hamburger onClick={toggle}>menu</Hamburger>
                )}
              </Controls>

              <Nav active={on}>
                <Navlist>
                  <HeaderLink onClick={deactivate} to="/todo">
                    Help
                  </HeaderLink>
                  <ThemeProvider theme={buttonTheme}>
                    <HeaderLink
                      link={ButtonLink}
                      onClick={deactivate}
                      to="/logout"
                    >
                      Sign out
                    </HeaderLink>
                  </ThemeProvider>
                </Navlist>
              </Nav>
            </HeaderWrapper>
          </Header>
        </ThemeProvider>

        <Header>
          <HeaderWrapper className="wrap-sides">
            <Nav active={on}>
              <SecondaryNavlist>
                <Navlink onClick={deactivate} to="/">
                  Home
                </Navlink>
                <Navlink onClick={deactivate} to="/profile">
                  Profile
                </Navlink>
                <Navlink onClick={deactivate} to="/permissions">
                  Permissions
                </Navlink>
                <Navlink onClick={deactivate} to="/activity">
                  Activity
                </Navlink>
                <Query query={queryMessages} variables={{ userID: user.id }}>
                  {({ loading, error, data: { user } }) => {
                    const count = flatMap(conv => conv.messages)(
                      (user && user.conversations) || []
                    ).filter(msg => msg.readStatus === 'Unread').length

                    return user ? (
                      <Navlink
                        onClick={deactivate}
                        to="/messages"
                        link={IndicatorLink}
                        data-count={count ? count : ''}
                      >
                        Messages
                      </Navlink>
                    ) : (
                      <Navlink onClick={deactivate} to="/messages">
                        Messages
                      </Navlink>
                    )
                  }}
                </Query>
              </SecondaryNavlist>
            </Nav>
          </HeaderWrapper>
        </Header>
      </Fragment>
    )}
  </Toggle>
)

export {
  StickyHeader as default,
  Header,
  Controls,
  LoggedOutHeader,
  MinimalHeader,
}
