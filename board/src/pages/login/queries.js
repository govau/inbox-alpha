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

We have received new address information from you (Transaction ID: CoN3462), which may impact your Rent Assistance payments.
`

export const rentAssistHelp = `
## Need help?

If you need help submitting your documents, [book a time](/) and we'll call you back.
`

export const centrelinkBody = `
Hi Alex,

  Transaction ID: CoN3462

Your change of name request has been successfully processed.

If you did not initiate this request, please get in contact with [Centrelink support](https://google.com)
`

export const assessmentBody = `
Hi Alex,

Your income tax return has been processed.  
View your income tax Notice of Assessment for more information.
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
  ) {
    createUser(
      data: {
        name: $username
        conversations: {
          create: [
            {
              subject: "Rent Assistance"
              service: { connect: { id: $centrelinkID } }
              messages: {
                create: [
                  {
                    sender: { create: { source: Service } }
                    sentAt: "Tue 19 June 2018, 5:30pm"
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: { create: { source: $rentAssistBody } }
                        }
                      ]
                    }
                  }
                  {
                    sender: { create: { source: Service } }
                    readAt: "Wed 20 June 2018, 5:31pm"
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: {
                            create: {
                              source: "Please attach a copy if your new Rental Contract to confirm your new address within 14 days."
                            }
                          }
                        }
                        {
                          kind: RequestDocument
                          requestDocument: { create: { linkText: "Attach Rental Contract"} }
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
                    sentAt: "Tue 09 June 2018, 2:30pm"
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: { create: { source: $assessmentBody } }
                        }
                      ]
                    }
                  }
                  {
                    sections: {
                      create: [
                        {
                          kind: Document
                          document: {
                            create: {
                              filename: "2017 Notice of Assessment.pdf"
                            }
                          }
                        }
                      ]
                    }
                  }
                  {
                    readAt: "Tue 09 June 2018, 7:33pm"
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: {
                            create: {
                              source: "Amount owing: **1086.24**  \\nDue date: 15 Jun 2018"
                            }
                          }
                        }
                        {
                          kind: RequestPayment
                          requestPayment: {
                            create: {
                              amountInCents: 108624
                              linkText: "Pay now"
                            }
                          }
                        }
                        {
                          kind: RequestScheduledPayment
                          requestScheduledPayment: {
                            create: {
                              amountInCents: 108624
                              linkText: "Pay on due date"
                            }
                          }
                        }
                        {
                          kind: RequestCall
                          requestCall: {
                            create: {
                              linkText: "Request a call back to discuss payment options"
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
