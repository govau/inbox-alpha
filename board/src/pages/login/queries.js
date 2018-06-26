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

If you need help submitting your documents, [book a time](/) and we'll call you back.
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
        conversations: {
          create: [
            {
              subject: "Rental Contract required"
              service: { connect: { id: $centrelinkID } }
              messages: {
                create: [
                  {
                    sender: { create: { source: Service } }
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: { create: { source: $rentAssistBody } }
                        }
                        {
                          kind: RequestDocument
                          requestDocument: { create: {} }
                        }
                        {
                          kind: Markdown
                          markdown: { create: { source: $rentAssistHelp } }
                        }
                      ]
                    }
                  }
                  {
                    sender: { create: { source: User } }
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: {
                            create: {
                              source: "a followup message regarding your rental contract"
                            }
                          }
                        }
                        {
                          kind: RequestDocument
                          requestDocument: { create: {} }
                        }
                      ]
                    }
                  }
                ]
              }
            }
            {
              subject: "Name update"
              service: { connect: { id: $centrelinkID } }
              messages: {
                create: [
                  {
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: { create: { source: $centrelinkBody } }
                        }
                      ]
                    }
                  }
                ]
              }
            }
            {
              subject: "Benefit statement"
              service: { connect: { id: $medicareID } }
              messages: {
                create: [
                  {
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: {
                            create: {
                              source: "Your benefits have been transferred by EFT to your nominated account. View the attached statement for full details."
                            }
                          }
                        }
                        {
                          kind: Document
                          document: {
                            create: { filename: "Benefit EFT statement" }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
            {
              subject: "Tax Assessment 2017"
              service: { connect: { id: $taxID } }
              messages: {
                create: [
                  {
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: { create: { source: $assessmentBody } }
                        }
                        {
                          kind: Document
                          document: {
                            create: { filename: "2017 Notice of Assessment" }
                          }
                        }
                        {
                          kind: RequestPayment
                          requestPayment: {
                            create: {
                              amountInCents: 108624
                              linkText: "Pay for your tax stuff"
                            }
                          }
                        }
                      ]
                    }
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
