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

**You need to:**
`

export const rentAssistHelp = `
## Need help?

If you need help submitting your documents, **[book a time](https://google.com) and we'll call you back.**
`

export const centrelinkBody = `
Hi Alex,

  Transaction ID: 22X4423181

Your change of name request has been successfully processed.

If you did not initiate this request, please get in contact with [Centrelink support](https://google.com)
`

export const assessmentBody = `
Hi Alex,

Your income tax return has been processed. View your income tax notice of assessment for more information.
`


const createNewUser = gql`
  mutation(
    $username: String!
    $taxID: ID!
    $centrelinkID: ID!
    $medicareID: ID!
    $assessmentBody: String
    $centrelinkBody: String
    $rentAssistBody: String
    $rentAssistHelp: String
  ) {
    createUser(
      data: {
        name: $username
        messages: {
          create: [
            {
              subject: "Rental Contract required"
              body: $rentAssistBody
              moreInformation: $rentAssistHelp
              readStatus: Unread
              sender: { connect: { id: $centrelinkID } }
              sent: "10:34 AM"
              notices: {
                create: {
                  description: "Further information needed"
                  severity: Important
                }
              }
              tasks: {
                create: [
                  {
                    instruction: "Attach a copy of your new **Rental Contract** to update your new address and confirm your payments."
                    task: Upload
                  }
                  { task: Submit }
                ]
              }
            }
            {
              subject: "Name update"
              body: $centrelinkBody
              readStatus: Unread
              sender: { connect: { id: $centrelinkID } }
              sent: "9:15 AM"
              notices: {
                create: {
                  description: "Request completed"
                  severity: Information
                }
              }
            }
            {
              subject: "Benefit statement"
              body: "Your benefits have been transferred by EFT to your nominated account. View the attached statement for full details."
              readStatus: Unread
              sender: { connect: { id: $medicareID } }
              sent: "13 June"
              documents: { create: { filename: "Benefit EFT statement" } }
            }
            {
              subject: "Tax Assessment 2017"
              body: $assessmentBody
              readStatus: Read
              sender: { connect: { id: $taxID } }
              sent: "8 June"
              notices: {
                create: {
                  description: "Payment due 29 Jun 2018"
                  severity: Important
                }
              }
              documents: { create: { filename: "2017 Notice of Assessment" } }
              tasks: {
                create: [
                  {
                    instruction: ""
                    paymentAmount: "$1086.24"
                    task: SendPayment
                  }
                ]
              }
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
