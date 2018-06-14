import gql from 'graphql-tag'

export const taxBody = `
# Tax returns 2017
Fill em out. You need to anyway, here’s some reasons

* We need to pay you if we owe you
* You need to pay us if you owe us
* The only reason for our being is to pursue tax returns from individuals such as you
* as such we have no purpose outside of sending you this email and getting. our. money. Right. Now.
* Send it
* Send it in now

Thank you, ATO AUSTRALIA TAXATION OFFICE 2018
Thanks. Thank you

*Send it in*
/please/ 
`

export const rentAssistBody = `
Hi Alex,

We have received new address information from you, which may impact your Rent Assistance payments.

We need a copy of your new **Rental Contract** to update your new address and confirm your payments.
`

const createNewUser = gql`
  mutation(
    $username: String!
    $taxID: ID!
    $centrelinkID: ID!
    $taxBody: String
    $rentAssistBody: String
  ) {
    createUser(
      data: {
        name: $username
        messages: {
          create: [
            {
              subject: "Rent Assistance form required"
              body: $rentAssistBody
              readStatus: Unread
              sender: { connect: { id: $centrelinkID } }
              notices: {
                create: {
                  description: "Document required"
                  severity: Important
                }
              }
            }
            {
              subject: "Tax Assessment 2017"
              body: $taxBody
              readStatus: Read
              sender: { connect: { id: $taxID } }
              notices: {
                create: { description: "Payment overdue!!", severity: Critical }
              }
              documents: { create: { filename: "2017 Notice of Assessment" } }
            }
            {
              subject: "Rent Assistance"
              body: "here's your rent assistance ey"
              readStatus: Unread
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
              readStatus: Unread
              sender: { connect: { id: $centrelinkID } }
              notices: {
                create: { description: "Transaction complete: 2248123xX3" }
              }
            }
            {
              subject: "Tax Assessment 2017"
              body: "fill out your tax assessment. thanks"
              readStatus: Read
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
