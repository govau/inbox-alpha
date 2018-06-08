import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css, ThemeProvider } from 'styled-components'

import logo from './mygov.svg'
import Icon from '../icon'
import { header } from '../mygov'

const Navitem = styled.li``

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

const Hamburger = styled(Icon)`
  @media screen and (min-width: 768px) {
    display: none;
  }
`

const Header = styled.header`
  background-color: ${props => props.theme.backgroundColour};
  color: ${props => props.theme.copyColour};
  margin-top: 0;

  a {
    color: ${props => props.theme.copyColour};
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

const Navlink = props => (
  <Navitem>
    <Link {...props} />
  </Navitem>
)

const StickyHeader = ({ active, toggleActive, deactivate, globals, pages }) => (
  <ThemeProvider theme={header}>
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
          {active ? (
            <Hamburger onClick={toggleActive}>close</Hamburger>
          ) : (
            <Hamburger onClick={toggleActive}>menu</Hamburger>
          )}
        </Controls>

        <Nav active={active}>
          <Navlist>
            <Navlink onClick={deactivate} to="/">
              Home
            </Navlink>
            <Navlink onClick={deactivate} to="/loading">
              Loading
            </Navlink>
            <Navlink onClick={deactivate} to="/help">
              Help
            </Navlink>
          </Navlist>
        </Nav>
      </HeaderWrapper>
    </Header>
  </ThemeProvider>
)

class ClickyHeader extends React.Component {
  state = { active: false }

  toggleNav = e => {
    this.setState({
      ...this.state,
      active: !this.state.active,
    })
  }

  deactivate = e => {
    this.setState({
      ...this.state,
      active: false,
    })
  }

  render() {
    return (
      <StickyHeader
        active={this.state.active}
        toggleActive={this.toggleNav}
        deactivate={this.deactivate}
        {...this.props}
      />
    )
  }
}

export { ClickyHeader as default, Header, Controls, ClickyHeader, StickyHeader }
