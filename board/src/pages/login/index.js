import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { graphql, Mutation } from 'react-apollo'

import { Authenticated, setSession, unsetSession } from '../../components/auth'
import withData from '../../components/with-data'
import { createNewUser, queryServices, taxBody, rentAssistBody } from './queries'

const Login = ({ services }) => {
  let input

  return (
    <Fragment>
      <Mutation
        mutation={createNewUser}
        onCompleted={({ createUser: user }) => {
          setSession(user)
        }}
      >
        {(create, { loading, error, data }) => (
          <form
            onSubmit={e => {
              e.preventDefault()
              create({
                variables: {
                  username: input.value,
                  taxID: services.find(
                    service =>
                      service.agency.name === 'Australian Taxation Office'
                  ).id,
                  centrelinkID: services.find(
                    service => service.agency.name === 'Centrelink'
                  ).id,
                  taxBody,
                  rentAssistBody,
                },
              })
              input.value = ''
            }}
          >
            <input
              ref={node => {
                input = node
              }}
            />

            {loading ? (
              <div>loading ... </div>
            ) : (
              <Fragment>
                <Authenticated user={data}>
                  <Redirect to="/messages" />
                </Authenticated>
                <button type="submit">log in</button>
              </Fragment>
            )}
          </form>
        )}
      </Mutation>
    </Fragment>
  )
}

const loginWithServices = graphql(queryServices)(withData(Login))

const Logout = ({ props }) => {
  unsetSession()
  return <Redirect to="/" />
}

export { loginWithServices as default, Login, Logout }
