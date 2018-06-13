import React from 'react'
import styled from 'styled-components'

import Icon from '../../components/icon'
import Toggle from '../../components/toggle'
import Markdown from '../../components/markdown'
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

const AddAttachment = styled.div`
  background-color: #eee;
  padding: 2em 4em;
`

const Msg = ({ msg, ...props }) => (
  <Toggle>
    {({ on, toggle, activate, deactivate }) =>
      on ? (
        <MessageContent>
          <About>
            <Subject onClick={deactivate}>{msg.subject}</Subject>{' '}
            <Sender>{msg.sender.agency.name}</Sender>
          </About>

          <Markdown source={msg.body} />

          <AddAttachment>
            Drag a document here to add it as an attachment
          </AddAttachment>
          <button>or click here to upload</button>

          <h3>Having trouble?</h3>
          <p>
            Just call us at <a href="/">0423222111</a> and we can
            sort you out straight away. Go on, give us a jingle
          </p>

          <Features lozenges>
            {msg.notices.map((notice, i) => (
              <Lozenge
                overdue={notice.severity === 'Critical'}
                important={notice.severity === 'Important'}
                key={i}
              >
                {notice.description}
              </Lozenge>
            ))}
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
      ) : (
        <Message {...props}>
          <SenderInfo>
            <SenderCircle image={msg.sender.agency.logo}>
              {msg.sender.agency.name.substring(0, 3)}
            </SenderCircle>
          </SenderInfo>

          <MessageContentWrapper>
            <MessageContent>
              <About>
                <Subject onClick={activate}>{msg.subject}</Subject>{' '}
                <Sender>{msg.sender.agency.name}</Sender>
              </About>

              <Features lozenges>
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
      )
    }
  </Toggle>
)

export { Msg as default }
