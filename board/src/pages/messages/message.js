import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '../../components/button'
import Icon from '../../components/icon'
import Markdown from '../../components/markdown'
import FileInput from '../../components/file-input'
import {
  Message,
  About,
  Subject,
  Sender,
  SenderInfo,
  SenderCircle,
  MessageContent,
  MessageContentWrapper,
  Features,
  Lozenge,
  Document,
  Prompt,
  Timestamp,
} from './components'

const Hr = styled.hr`
  border-style: dashed;
  border-color: #aaa;
  border-width: 1px;
  border-top: 0;
  margin-top: 2em;
`

const Actionables = styled.div`
  background-color: #eee;
  padding: 2em;
`

const Msg = ({ msg, ...props }) => (
  <Switch>
    <Route
      exact
      path={`/messages/${msg.id}`}
      render={() => (
        <Message {...props}>
          <SenderInfo>
            <SenderCircle image={msg.sender.agency.logo}>
              {msg.sender.agency.name.substring(0, 3)}
            </SenderCircle>
          </SenderInfo>

          <MessageContentWrapper>
            <MessageContent>
              <About>
                <Subject status={msg.readStatus}>{msg.subject}</Subject>
                <Sender status={msg.readStatus}>
                  {msg.sender.agency.name}
                </Sender>
              </About>

              <Features>
                {msg.notices.map((notice, i) => (
                  <Lozenge
                    overdue={notice.severity === 'Critical'}
                    important={notice.severity === 'Important'}
                    key={i}
                  >
                    {notice.description}
                  </Lozenge>
                ))}
              </Features>

              <Actionables>
                <Markdown source={msg.body} />
                <FileInput name="attachment" />
                <Button>Send</Button>
              </Actionables>

              <Features>
                {msg.documents.map((doc, i) => (
                  <Document
                    key={i}
                    to={doc.location || '/todo'}
                    icon={<Icon>{doc.kind || 'book'}</Icon>}
                  >
                    {doc.filename}
                  </Document>
                ))}
              </Features>
              <Hr />

              <h3>Having trouble?</h3>
              <p>
                Just call us at <a href="/">0423222111</a> and we can sort you
                out straight away. Go on, give us a jingle
              </p>
              <p>ref: 201747573772</p>
            </MessageContent>

            <Prompt>
              {msg.documents.find(doc => true) && <Icon>attachment</Icon>}
              <Timestamp>09:48 AM</Timestamp>
            </Prompt>
          </MessageContentWrapper>
        </Message>
      )}
    />
    <Route
      exact
      path="/messages"
      render={() => (
        <Message {...props}>
          <SenderInfo>
            <SenderCircle image={msg.sender.agency.logo}>
              {msg.sender.agency.name.substring(0, 3)}
            </SenderCircle>
          </SenderInfo>

          <MessageContentWrapper>
            <MessageContent>
              <About>
                <Link to={`/messages/${msg.id}`}>
                  <Subject status={msg.readStatus}>{msg.subject}</Subject>
                  <Sender status={msg.readStatus}>
                    {msg.sender.agency.name}
                  </Sender>
                </Link>
              </About>

              <Features>
                {msg.notices.map((notice, i) => (
                  <Lozenge
                    overdue={notice.severity === 'Critical'}
                    important={notice.severity === 'Important'}
                    key={i}
                  >
                    {notice.description}
                  </Lozenge>
                ))}
              </Features>

              <Features>
                {msg.documents.map((doc, i) => (
                  <Document
                    key={i}
                    to={doc.location || '/todo'}
                    icon={<Icon>{doc.kind || 'book'}</Icon>}
                  >
                    {doc.filename}
                  </Document>
                ))}
              </Features>
            </MessageContent>

            <Prompt>
              {msg.documents.find(doc => true) && <Icon>attachment</Icon>}
              <Timestamp>09:48 AM</Timestamp>
            </Prompt>
          </MessageContentWrapper>
        </Message>
      )}
    />
  </Switch>
)

export { Msg as default }
