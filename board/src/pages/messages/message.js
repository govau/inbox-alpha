import React from 'react'

import Icon from '../../components/icon'
import IconLink from '../../components/icon-link'
import Toggle from '../../components/toggle'
import {
  Messages,
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
  Attachment,
  Timestamp,
} from './components'

const Msg = ({ msg, ...props }) => (
  <Toggle>
    {({ on, toggle, activate, deactivate }) => (
      <Message {...props}>
        <SenderInfo>
          <SenderCircle image={msg.sender.agency.logo}>
            {msg.sender.agency.name.substring(0, 3)}
          </SenderCircle>
        </SenderInfo>

        <MessageContentWrapper>
          <MessageContent>
            <About>
              <Subject onClick={toggle}>{msg.subject}</Subject>{' '}
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

        {on && (
          <div>
            <p>HERES THE BODY</p>
            <p>{msg.body}</p>
          </div>
        )}
      </Message>
    )}
  </Toggle>
)

export { Msg as default }
