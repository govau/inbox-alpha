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

  /* hide marked content for testing easter-egg */
  .more-information strong {
    background-color: ${props => props.theme.copyColour};
  }
`

export const Message = styled.li`
  margin-top: 0;
  padding: 1em 0;
  display: flex;
  flex-flow: row nowrap;
  border-top: 3px solid #d5d5d5;

  & + & {
    border-top: 1px solid #d5d5d5;
  }

  > * + * {
    margin-top: 0;
  }
`

export const ReadMessage = styled(Message)`
  background-color: #f3f5f5;
`

export const Sender = styled.span`
  font-weight: ${props => (props.status === 'Unread' ? 'bold' : 'normal')};
`

export const Subject = styled.span`
  font-weight: ${props => (props.status === 'Unread' ? 'bold' : 'normal')};

  & + ${Sender} {
    border-left: 1px solid ${props => props.theme.copyColour};
    margin-left: 1rem;
    padding-left: 1rem;
  }
`

export const ShortSubject = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0;
`

export const ShortSender = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
`

export const About = styled.header`
  a {
    color: ${props => props.theme.copyColour};
    text-decoration: none;
  }
`

const lozengeColour = ({ overdue, important, information }) => {
  if (information) {
    return css`
      padding: 0;
      border-radius: 0;
    `
  }

  if (true) {
    return css`
      background-color: transparent;
      border: 1px solid #bbb;
    `
  }

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

export const Lozenge = styled(
  ({ overdue, important, information, className, ...props }) => (
    <span className={classnames('lozenge', className)} {...props} />
  )
)`
  font-size: 0.8em;
  display: inline-block;
  border-radius: 1em;
  padding: 0.2rem 1.5rem;
  ${lozengeColour};
`

export const Document = styled(IconLink)`
  background-color: #f3f5f5;
  font-size: 0.8em;
  border-radius: 3px;
  padding: 0.5rem 0.5rem;

  &,
  &:visited {
    color: #246add;
  }

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
  margin: 0 1rem;

  * + * {
    margin-top: 0;
  }
`

export const Attachment = styled.div``

export const Timestamp = styled.div`
  font-size: 0.8em;
`
