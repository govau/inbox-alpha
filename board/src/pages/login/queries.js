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
              notices: {
                create: { description: "Payment overdue!!", severity: Critical }
              }
              documents: { create: { filename: "2017 Notice of Assessment" } }
            }
            {
              subject: "Rent Assistance"
              body: "here's your rent assistance ey"
              sender: { connect: { id: $centrelinkID } }
              notices: {
                create: {
                  description: "Lodge form by 29 June 2018"
                  severity: Information
                }
              }
            }
            {
              subject: "Name update"
              body: "update your name, thanks."
              sender: { connect: { id: $centrelinkID } }
              notices: {
                create: {
                  description: "Provide more documents"
                  severity: Important
                }
              }
              documents: {
                create: {
                  filename: "Click to download calendar invite"
                  kind: "calendar_today"
                }
              }
            }
            {
              subject: "Tax Assesment 2017"
              body: "fill out your tax assesment. thanks"
              sender: { connect: { id: $taxID } }
              notices: {
                create: {
                  description: "Payment due 29 Jun 2018"
                  severity: Important
                }
              }
              documents: { create: { filename: "2017 Notice of Assessment" } }
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
