import React from 'react'
import styled from 'styled-components'

import Icon from '../icon'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  color: #d7ea6a;
  background-color: rgba(10, 100, 64, 0.85);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`

const Contents = styled.div`
  font-size: 1.4em;
  text-align: center;
  color: colour-white;
  position: fixed;
  top: calc(50% - 2rem);
  margin-top: 0;

  & * + * {
    margin-top: 0;
  }
`

const Spinner = styled.div`
  margin: 60px auto;
  font-size: 10px;
  position: fixed;
  top: calc(50% - 20rem);
  text-indent: -9999em;
  border-top: 0.5em solid #d7ea6a;
  border-right: 0.5em solid #d7ea6a;
  border-bottom: 0.5em solid #d7ea6a;
  border-left: 0.5em solid rgba(215, 234, 106, 0.35);
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;

  &:before {
    content: 'hey!';
  }

  &,
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingIcon = styled(Icon)`
  position: fixed;
  top: calc(50% - 11.5rem);
  font-size: 3em !important;
`

const Overlay = styled.div``

export default props => {
  const { children, icon, className, ...rest } = props

  return (
    <Container>
      {icon && <LoadingIcon>{icon}</LoadingIcon>}
      <Spinner />
      <Contents {...rest} className={className}>
        {children}
      </Contents>
      <Overlay />
    </Container>
  )
}
