import React from 'react'
import styled from 'styled-components'

import { Text } from '../../../components/forms'
import IconLink from '../../../components/icon-link'
import attachment from './attachment.png'

export const H1 = styled.h1`
  @media screen and (min-width: 768px) {
    flex: 1;
  }
`

export const Messages = styled.ul`
  list-style: none;
  padding: 0;
`

export const Heading = styled.header`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: space-between;

    > * + * {
      margin-top: 0;
    }
  }

  & + ${Messages} {
    margin-top: 2em;
  }
`

export const Search = styled(Text)`
  @media screen and (min-width: 768px) {
    flex: 2;
  }
`

export const SenderInfo = styled.div``

export const SenderCircle = styled.div`
  background-color: #d5d5d5;
  color: #7d7d7d;
  border-radius: 50%;
  padding: 0.6rem 0.9rem;
  height: 4rem;
  width: 4rem;
  font-size: 0.9em;
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
  align-items: flex-start;

  /* hide marked content for testing easter-egg */
  .more-information strong {
    background-color: ${props => props.theme.copyColour};
  }
`

export const Message = styled.li`
  background-color: ${({ active }) => (active ? '#f3f5f5' : '#fff')};
  margin-top: 0;
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  & + & {
    border-top: 1px solid #d5d5d5;
  }

  > * + * {
    margin-top: 0;
    margin-left: 1rem;
  }
`

export const ShortSubject = styled.span`
  font-weight: ${props => (props.unread ? 'bold' : 'normal')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0;
`

export const ShortSender = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${props => (props.unread ? 'bold' : 'normal')};
`

export const Document = styled(({ className, ...props }) => (
  <figure className={className}>
    <img src={attachment} alt="an attached document" />
    <figcaption>
      <IconLink {...props} />
    </figcaption>
  </figure>
))`
  font-size: 0.8em;
  border-radius: 3px;
  margin-left: 0;
  margin-right: 0;
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center;

  ${IconLink} {
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
  }
`
