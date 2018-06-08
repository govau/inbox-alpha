import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import withData from '../components/with-data'

const createNewUser = gql`
  mutation($username: String!) {
    createUser(data: { name: $username }) {
      name
      id
    }
  }
`

const Login = ({ users }) => {
  let input

  return (
    <Fragment>
      <Mutation
        mutation={createNewUser}
        onCompleted={({ createUser: { name, id } }) =>
          console.log('CREATED USER', { name, id })
        }
      >
        {(create, { loading, error, data }) => (
          <form
            onSubmit={e => {
              e.preventDefault()
              create({ variables: { username: input.value } })
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
              <button type="submit">log in</button>
            )}
          </form>
        )}
      </Mutation>
    </Fragment>
  )
}

export { Login as default }
