import React from 'react'
import styled, { css } from 'styled-components'
import classnames from 'classnames'

import IconLink from '../../components/icon-link'

export const Messages = styled.ul`
  list-style: none;
  padding: 0;
`

export const SenderInfo = styled.div``

export const SenderCircle = styled.div`
  background-color: #d5d5d5;
  color: white;
  border-radius: 50%;
  margin: 0 1rem;
  margin-right: 3rem;
  padding: 0.4em;
`

export const MessageContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
    justify-content: space-between;
  }
`

export const MessageContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`

export const Message = styled.li`
  border-top: 1px solid #d5d5d5;
  padding: 1em 0;
  display: flex;
  flex-flow: row nowrap;

  > * + * {
    margin-top: 0;
  }
`

export const About = styled.header`
  ${Subject} a, ${Sender} a {
    color: ${props => props.theme.copyColour};
    text-decoration: none;
  }
`

export const Subject = styled.span`
  font-weight: ${props => (props.status === 'Unread' ? 'bold' : 'normal')};
  border-right: 1px solid ${props => props.theme.copyColour};
  margin-right: 1rem;
  padding-right: 1rem;
`

export const Sender = styled.span`
  font-weight: ${props => (props.status === 'Unread' ? 'bold' : 'normal')};
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
  display: inline-block;
  border-radius: 1em;
  padding: 0.2rem 1.5rem;
  ${lozengeColour};
`

export const Document = styled(IconLink)`
  background-color: #f3f5f5;
  color: #246add;
  font-size: 0.8em;
  border-radius: 3px;
  padding: 0.5rem 0.5rem;

  & span {
    margin-left: 0.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (min-width: 768px) {
    & span {
      max-width: 20rem;
    }
  }
`

export const Features = styled.div`
  margin-top: 0;
  display: flex;
  flex-flow: column nowrap;

  ${props =>
    props.lozenges
      ? css`
          margin-left: -1.5rem;
        `
      : css``}
  }

  ${Lozenge} {
    margin-top: 1rem;
  }

  ${Document} {
    margin-top: 1em;
  }


  @media screen and (min-width: 768px) {
    flex-flow: row wrap;

    ${Document}, ${Lozenge} {
      margin-right: 1em;
    }
  }
`

export const Prompt = styled.div`
  display: flex;
  flex-flow: row nowrap;

  * + * {
    margin-top: 0;
  }
`

export const Attachment = styled.div``

export const Timestamp = styled.div``
