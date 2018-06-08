import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import withData from '../components/with-data'

const queryUsers = gql`
  {
    users {
      name
      id
    }
  }
`

const createNewUser = gql`
  mutation {
    createUser(data: { name: "Samantha" }) {
      name
      id
    }
  }
`

const Homepage = ({ users }) => (
  <Fragment>
    <ul>
      {users.map((user, i) => (
        <li key={i}>
          {user.name} - {user.id}
        </li>
      ))}
    </ul>

    <Mutation
      mutation={createNewUser}
      update={(cache, { data: { createUser } }) => {
        const { users } = cache.readQuery({ query: queryUsers })

        cache.writeQuery({
          query: queryUsers,
          data: { users: users.concat([createUser]) },
        })
      }}
    >
      {(create, { loading, error, data }) =>
        loading ? (
          <div>loading ... </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <button onClick={create}>create another</button>
        )
      }
    </Mutation>
  </Fragment>
)

const withUsers = graphql(queryUsers)(withData(Homepage))

export { withUsers as default, Homepage }
