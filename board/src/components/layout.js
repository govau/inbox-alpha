import React, { Fragment } from 'react'
import styled from 'styled-components'

const Side = styled.div`
  flex: 1;
  align-self: flex-start;
  position: sticky;
  top: 0;
`

const Master = styled.div`
  flex: 2;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;

    ${Side}, ${Master} {
      margin-top: 0;
    }
  }
`

const Main = styled(
  ({ side, children, ...props }) =>
    side ? (
      <Wrapper>
        <Side>{side}</Side>
        <Master {...props}>{children}</Master>
      </Wrapper>
    ) : (
      <Fragment>{children}</Fragment>
    )
)``

export { Main as default }
