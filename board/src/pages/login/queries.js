import gql from 'graphql-tag'

const createNewUser = gql`
  mutation($username: String!, $taxID: ID!, $centrelinkID: ID!) {
    createUser(
      data: {
        name: $username
        messages: {
          create: [
            {
              subject: "Tax Assesment"
              body: "you blew it. we really need that tax $$$"
              sender: { connect: { id: $taxID } }
            }
            {
              subject: "Rent Assistance"
              body: "here's your rent assistance ey"
              sender: { connect: { id: $centrelinkID } }
            }
            {
              subject: "Name update"
              body: "update your name, thanks."
              sender: { connect: { id: $centrelinkID } }
            }
            {
              subject: "Tax Assesment 2017"
              body: "fill out your tax assesment. thanks"
              sender: { connect: { id: $taxID } }
            }
          ]
        }
      }
    ) {
      id
      name
    }
  }
`

const queryServices = gql`
  query {
    services {
      id
      name
      description
      agency {
        name
      }
    }
  }
`
export { createNewUser, queryServices }
