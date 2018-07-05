import React from 'react'
import styled from 'styled-components'

import Master from '../components/layout'
import { Text, Submit, Textarea } from '../components/forms'

const Sub = styled.sub``

const Container = styled.article`
  max-width: 80rem;
`

const Support = props => (
  <Master>
    <Container>
      <header>
        <h1>What is your message about?</h1>
      </header>

      <form>
        <p>
          Tell us a little bit about your enquiry and we may be able to give you
          a faster answer
        </p>
        <p>
          <Sub>eg. Apply for early release of superannuation</Sub>
        </p>
        <Text />

        <p> What is your issue?</p>
        <Textarea />

        <Submit>Solve it</Submit>
      </form>
    </Container>
  </Master>
)

export { Support as default }
