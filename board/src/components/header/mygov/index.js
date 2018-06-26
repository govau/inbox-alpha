/* eslint-disable */

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import classnames from 'classnames'

import Icon from '../../icon'
import IconLink from '../../icon-link'

import './mygov.css'
import logo from './mygov.svg'

const Navitem = props => {
  const { active = false, className, children, ...rest } = props

  const classes = classnames(className, 'nav__navitem', {
    'nav__navitem--active': active,
  })

  return (
    <li {...rest} className={classes}>
      {children}
    </li>
  )
}

const RouterActiveNavitem = props => {
  const { to, pathname = to, children, router, onClick, ...rest } = props

  const isActive = !!router && router.isActive({ pathname }, true)

  return (
    <Navitem {...rest} active={isActive}>
      <Link onClick={onClick} to={pathname}>
        {children}
      </Link>
    </Navitem>
  )
}

const RoutedItem = withRouter(RouterActiveNavitem)

// necessary to weave location through to force redux to udate :[
const Identity = props => {
  const { toggle, hide, active, children, location, ...rest } = props

  const isOpen = !!active

  const toolbarClasses = classnames('header__toolbar', { hidden: !isOpen })

  return (
    <header {...rest} role="banner">
      <div className="wrapper">
        <div className="header__wrapper">
          <div className="header__controls">
            <h1>
              <Link onClick={close} to="/">
                <img
                  style={{ height: '4rem', marginTop: '1rem' }}
                  src={logo}
                  alt="MyGov logo"
                />
              </Link>
            </h1>

            <IconLink
              icon={isOpen ? <Icon>close</Icon> : <Icon>menu</Icon>}
              className="header__trigger"
              href="javascript:;"
              onClick={toggle}
              reversed
            />
          </div>

          <div className={toolbarClasses}>
            <nav className="header__nav">
              <ul className="header__navitems">
                <RoutedItem onClick={hide} to="/todo/help/">
                  How we keep your information private
                </RoutedItem>
                <RoutedItem onClick={hide} to="/todo/help/">
                  Our identity partners
                </RoutedItem>
                <RoutedItem onClick={hide} to="/todo/help/">
                  Services you can access
                </RoutedItem>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

class Header extends React.Component {
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
      <Identity
        active={this.state.active}
        toggle={this.toggleNav}
        hide={this.deactivate}
        {...this.props}
      />
    )
  }
}

export { Header as default, Identity }
