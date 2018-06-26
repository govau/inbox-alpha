import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const setSession = data => sessionStorage.setItem('auth', JSON.stringify(data))

const unsetSession = () => sessionStorage.clear()

const getCurrentUser = () => {
  const blob = sessionStorage.getItem('auth')

  try {
    const data = JSON.parse(blob)
    return data
  } catch (error) {
    unsetSession()
    return null
  }
}

const isAuthenticated = () => {
  const user = getCurrentUser()
  return user ? (user.id ? true : false) : false
}

const AuthenticatedRoute = ({
  component: Component,
  alternative: Alternative,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} user={getCurrentUser()} />
      ) : Alternative ? (
        <Alternative />
      ) : (
        <Redirect to="/login/" />
      )
    }
  />
)

const Authenticated = ({ user, children }) =>
  user || getCurrentUser() ? children : null

export {
  isAuthenticated,
  getCurrentUser,
  AuthenticatedRoute,
  Authenticated,
  setSession,
  unsetSession,
}
