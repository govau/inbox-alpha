import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import Markdown from './markdown'
import FileInput from './file-input'
import { Button } from './button'
import { Submit as FormSubmit } from './forms'

const Upload = props => (
  <FileInput name={props.reference} onDocumentChange={props.onDocumentChange} />
)
const Download = props => <div>download me</div>
const AcceptPayment = props => <Button>Accept payment</Button>
const Consent = props => <Button>Consent</Button>
const Submit = props => <FormSubmit>Send</FormSubmit>
const FormText = props => <input type="text" />
const FormCheckbox = props => <input type="checkbox" />

const Payment = styled.div``

const Dl = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin-top: 1rem;

  div + div {
    margin-top: 0;
  }
`
const Hr = styled.hr`
  border-style: dashed;
  border-color: #aaa;
  border-width: 1px;
  border-top: 0;
  margin-top: 2em;
`

const BARF = styled.div`
  a {
    color: ${props => props.theme.copyColour};
  }

  @media screen and (min-width: 768px) {
    * + * {
      margin-left: 1em;
    }
  }
`

const SendPayment = props => (
  <Payment>
    <Hr />
    <Dl>
      <div>Amount owing: {props.paymentAmount}</div>
      <div>Due date: June 15</div>
    </Dl>

    <p>
      <strong>Choose when to pay:</strong>
    </p>
    <form>
      <div>
        <label>
          <input type="radio" name="payment" id="pay-now" />
          &nbsp;&nbsp;Pay now
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="payment" id="pay-later" />
          &nbsp;&nbsp;Pay later
        </label>
      </div>

      <BARF>
        <Button>Pay</Button>
        <Link to="/messages">Remind me later</Link>
      </BARF>
    </form>
  </Payment>
)

const TaskTypes = {
  Upload,
  Download,
  SendPayment,
  AcceptPayment,
  Consent,
  FormText,
  Submit,
  FormCheckbox,
}

const T = styled.div`
  & + & {
    margin-top: 2em;
  }
`

const Task = ({ instruction, task, ...more }) => {
  const Renderer = TaskTypes[task]

  return (
    <T>
      {instruction ? <Markdown source={instruction} /> : null}
      {Renderer ? <Renderer {...more} /> : null}
    </T>
  )
}

const createResponse = gql`
  mutation($messageID: ID!, $filenames: [DocumentCreateInput!], $body: String) {
    createResponse(
      data: {
        body: $body
        documents: { create: $filenames }
        references: { connect: { id: $messageID } }
      }
    ) {
      id
      body

      documents {
        id
        kind
        location
        filename
      }
    }
  }
`
const flatMap = fx => xs => Array.prototype.concat(...xs.map(fx))

class Tasks extends Component {
  state = {}

  setTaskDocuments = taskID => (...names) => {
    this.setState({
      ...this.state,
      [taskID]: names,
    })
  }

  render() {
    const { msg } = this.props

    return (
      <Mutation mutation={createResponse}>
        {(createResponse, { loading, error, data }) => (
          <form
            onSubmit={e => {
              e.preventDefault()
              createResponse({
                variables: {
                  messageID: msg.id,
                  filenames: flatMap(names => names)(
                    Object.values(this.state)
                  ).map(filename => ({ filename })),
                },
              })
            }}
          >
            {msg.tasks.map((task, i) => (
              <Task
                {...task}
                reference={`task-${i}`}
                key={i}
                onDocumentChange={this.setTaskDocuments(`task-${i}`)}
              />
            ))}
          </form>
        )}
      </Mutation>
    )
  }
}

export { Task as default, Tasks }
