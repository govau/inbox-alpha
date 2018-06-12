import React from 'react'
import styled, { css } from 'styled-components'
import classnames from 'classnames'

import IconLink from '../../components/icon-link'

export const Messages = styled.ul`
  list-style: none;
  padding: 0;
`

export const Message = styled.li`
  border-top: 1px solid #d5d5d5;
  padding: 1em 0;
  display: flex;
  flex-flow: column nowrap;
`

export const About = styled.header``

export const Subject = styled.strong``

export const Sender = styled.span``

export const Features = styled.div`
  .lozenge + .lozenge {
    margin-left: 1em;
  }
`

export const FlexFeatures = styled(Features)`
  display: flex;
`

const lozengeColour = ({ overdue, important }) => {
  if (overdue) {
    return css`
      background-color: #f4d0d6;
      color: #c42d37;
    `
  }

  if (important) {
    return css`
      background-color: #f8dabe;
      color: #ac5d24;
    `
  }

  return css`
    background-color: #dcdcdc;
  `
}

export const Lozenge = styled(({ overdue, important, className, ...props }) => (
  <span className={classnames('lozenge', className)} {...props} />
))`
  font-weight: bold;
  font-size: 0.8em;
  border-radius: 1em;
  padding: 0.5rem 1rem;
  ${lozengeColour};
`

export const Document = styled(IconLink)`
  background-color: #f3f5f5;
  color: #246add;
  font-size: 0.8em;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 0;

  & + & {
    margin-left: 1em;
  }

  & span {
    margin-left: 0.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20rem;
  }
`

export const Prompt = styled.div`
  align-self: flex-end;
`

export const Attachment = styled.div``

export const Timestamp = styled.div``