import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
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

  a {
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

const Navitem = styled.li`
  ${props =>
    props.active
      ? css`
          font-weight: bold;
        `
      : css``};

  ${ButtonLink} {
    color: ${props => props.theme.copyColour};
    background-color: ${props => props.theme.backgroundColour};
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

    ${Navitem} {
      margin-top: 0;
      padding: 0 2rem;
    }

    ${Navitem}:last-child {
      padding-right: 0;
    }
  }
`

const SecondaryNavlist = Navlist.extend`
  padding: 1rem 0;
  margin: 0;

  @media screen and (min-width: 768px) {
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

const Navlink = ({ active, link: Component = Link, ...props }) => (
  <Navitem active={active}>
    <Component {...props} />
  </Navitem>
)

const StickyHeader = ({ globals, pages }) => (
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
                  <Navlink onClick={deactivate} to="/todo">
                    Help
                  </Navlink>
                  <ThemeProvider theme={buttonTheme}>
                    <Navlink
                      link={ButtonLink}
                      onClick={deactivate}
                      to="/logout"
                    >
                      Sign out
                    </Navlink>
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
                <Navlink onClick={deactivate} to="/todo">
                  Profile
                </Navlink>
                <Navlink onClick={deactivate} to="/todo">
                  Permissions
                </Navlink>
                <Navlink onClick={deactivate} to="/todo">
                  Activity
                </Navlink>
                <Navlink active onClick={deactivate} to="/messages">
                  Messages (HOOK ME UP PLEASE)
                </Navlink>
              </SecondaryNavlist>
            </Nav>
          </HeaderWrapper>
        </Header>
      </Fragment>
    )}
  </Toggle>
)

export { StickyHeader as default, Header, Controls, StickyHeader }
