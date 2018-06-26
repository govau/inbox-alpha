import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Markdown from './markdown'
import FileInput from './file-input'
import { Button } from './button'

const Upload = props => <FileInput name="attachment" />
const Download = props => <div>download me</div>
const AcceptPayment = props => <Button>Accept payment</Button>
const Consent = props => <Button>Consent</Button>
const Submit = props => <Button>Send</Button>
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
        <Link to="/messages/">Remind me later</Link>
      </BARF>
    </form>
  </Payment>
)

const Tasks = {
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
  const Renderer = Tasks[task]

  return (
    <T>
      {instruction ? <Markdown source={instruction} /> : null}
      {Renderer ? <Renderer {...more} /> : null}
    </T>
  )
}

export { Task as default, Tasks }
