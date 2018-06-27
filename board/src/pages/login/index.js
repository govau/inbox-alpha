import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { graphql, Mutation } from 'react-apollo'
import styled from 'styled-components'

import { MinimalHeader } from '../../components/header'
import { Text, Password, Submit } from '../../components/forms'
import { Authenticated, setSession, unsetSession } from '../../components/auth'
import withData from '../../components/with-data'
import {
  createNewUser,
  queryServices,
  taxBody,
  rentAssistBody,
  assessmentBody,
  centrelinkBody,
  rentAssistHelp,
} from './queries'

const Panel = styled.div`
  background-color: white;
  border-radius: 3px;
  max-width: 50rem;
  padding: 1em 2em;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-weight: normal;
  }

  ${Text}:valid ~ ${Password}:valid ~ ${Submit} {
    background-color: #D1E65F;
  }
`

const Login = ({ services }) => {
  let input

  return (
    <Panel>
      <header>
        <h1>Log in</h1>
      </header>

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
                  medicareID: services.find(
                    service => service.agency.name === 'Medicare'
                  ).id,
                  taxBody,
                  assessmentBody,
                  rentAssistBody,
                  centrelinkBody,
                  rentAssistHelp,
                },
              })
              input.value = ''
            }}
          >
            <Text
              required
              placeholder="Username or email"
              reference={node => {
                input = node
              }}
            />

            <Password required placeholder="Password" />

            {loading ? (
              <div>loading ... </div>
            ) : (
              <Fragment>
                <Authenticated user={data}>
                  {(conversation =>
                    conversation ? (
                      <Redirect to={`/messages/${conversation.id}`} />
                    ) : (
                      <Redirect to="/messages" />
                    ))(
                    data &&
                      data.createUser.conversations.find(conversation => true)
                  )}
                </Authenticated>
                <Submit>Log in</Submit>
              </Fragment>
            )}

            <div>
              <Link to="/">Forgot password?</Link>
            </div>

            {error ? (
              <details>
                <summary>there was an error</summary>
                {error.message}
              </details>
            ) : null}
          </form>
        )}
      </Mutation>
    </Panel>
  )
}

const LoginWithServices = graphql(queryServices)(withData(Login))

const StandaloneWrapper = styled.div`
  background-color: #0c643f;
  min-height: 100vh;
`

const StandaloneMain = styled.main``

const StandaloneLogin = () => (
  <StandaloneWrapper>
    <MinimalHeader />
    <StandaloneMain role="main">
      <LoginWithServices />
    </StandaloneMain>
  </StandaloneWrapper>
)

const Logout = ({ props }) => {
  unsetSession()
  return <Redirect to="/" />
}

export { LoginWithServices as default, Login, Logout, StandaloneLogin }
