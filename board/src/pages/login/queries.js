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
Your change of name request has been successfully processed.

~~If you did not initiate this request, please get in contact with [Centrelink support](https://google.com)~~
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
              subject: "Tax Assessment 2013"
              service: { connect: { id: $taxID } }
              messages: {
                create: [
                  {
                    readStatus: Read
                    sentAt: "Wed 15 June 2013, 2:30pm"
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
                    readStatus: Read
                    sections: {
                      create: [
                        {
                          kind: Document
                          document: {
                            create: {
                              filename: "2013 Notice of Assessment.pdf"
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
            {
              subject: "Tax Assessment 2014"
              service: { connect: { id: $taxID } }
              messages: {
                create: [
                  {
                    readStatus: Read
                    sentAt: "Thurs 23 June 2014, 2:30pm"
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
                    readStatus: Read
                    sections: {
                      create: [
                        {
                          kind: Document
                          document: {
                            create: {
                              filename: "2014 Notice of Assessment.pdf"
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
            {
              subject: "Tax Assessment 2015"
              service: { connect: { id: $taxID } }
              messages: {
                create: [
                  {
                    readStatus: Read
                    sentAt: "Tue 2 Aug 2015, 2:30pm"
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
                    readStatus: Read
                    sections: {
                      create: [
                        {
                          kind: Document
                          document: {
                            create: {
                              filename: "2015 Notice of Assessment.pdf"
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
            {
              subject: "Tax Assessment 2016"
              service: { connect: { id: $taxID } }
              messages: {
                create: [
                  {
                    readStatus: Read
                    sentAt: "Tue 15 Aug 2016, 2:30pm"
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
                    readStatus: Read
                    sections: {
                      create: [
                        {
                          kind: Document
                          document: {
                            create: {
                              filename: "2016 Notice of Assessment.pdf"
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
            {
              subject: "Rent Assistance"
              service: { connect: { id: $centrelinkID } }
              messages: {
                create: [
                  {
                    sender: { create: { source: Service } }
                    sentAt: "Fri 26 April 2018, 2:30pm"
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
                              source: "Please attach a copy of your new Rental Contract to confirm your new address within 14 days."
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
                    sentAt: "Fri 03 May 2018, 2:00pm"
                    readStatus: Read
                    sections: {
                      create: [
                        {
                          kind: Markdown
                          markdown: { create: { source: "Hi Alex,\\n\\n Transaction ID: CoN3462" }}
                        }
                        {
                          kind: Confirmation
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
                    sentAt: "Tue 10 May 2018, 5:30pm"
                    readStatus: Read
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
              starred: true
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
                              source: "Amount owing: **1086.24**  \\nDue date: 15 Jul 2018"
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
      conversations(orderBy: createdAt_DESC) {
        id
      }
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
