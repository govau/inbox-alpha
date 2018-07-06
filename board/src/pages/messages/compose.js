import React, { Component, Fragment } from 'react'
import markdownify from 'draftjs-to-markdown'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Autocomplete from 'react-autocomplete'

import Master from '../../components/layout'
import Icon from '../../components/icon'
import { Button } from '../../components/button'
import CoreEditor from '../../components/editor'
import CacheBustingRedirect from '../../components/cache-busting-redirect'
import { Submit, Label, inputCSS } from '../../components/forms'
import { Heading, H1 } from './components'
import Sidenav from './sidenav'

const queryServices = gql`
  query {
    agencies(orderBy: name_ASC) {
      id
      name
      services(orderBy: name_ASC) {
        id
        name
        description
        contactNo

        agency {
          id
          name
        }
      }
    }

    services {
      id
      name
      description
      contactNo

      agency {
        id
        name
      }
    }
  }
`

const createConversation = gql`
  mutation(
    $userID: ID!
    $serviceID: ID!
    $sentAt: String
    $subject: String
    $markdownSource: String
  ) {
    createConversation(
      data: {
        user: { connect: { id: $userID } }
        service: { connect: { id: $serviceID } }
        subject: $subject
        messages: {
          create: {
            sentAt: $sentAt
            sender: { create: { source: User } }
            readStatus: Read
            sections: {
              create: {
                kind: Markdown
                markdown: { create: { source: $markdownSource } }
              }
            }
          }
        }
      }
    ) {
      id
    }
  }
`

const Wrapper = styled.section`
  @media screen and (min-width: 768px) {
    margin-left: 2rem;
  }
`

const Target = styled.div``

const Services = styled.ul`
  list-style: none;
  padding: 0;
  border: 1px solid #eee;
`

const Service = styled.li`
  padding: 1rem 2rem;
  padding-left: 4rem;

  & + & {
    margin-top: 0;
  }
`

const Agency = styled(Service)`
  padding: 1rem 2rem;
  color: #7d7d7d;
  border-top: 1px solid #eee;
`

const ServiceName = styled.div``

const ServiceDescription = styled.div`
  margin-top: 0;
  opacity: 0.7;
  font-size: 0.8em;
`

const ActiveService = styled(Service)`
  background-color: #eee;

  ${ServiceName} {
    font-weight: bold;
  }
`

const AutocompleteWrapper = styled.div`
  margin-top: 0.75rem;

  input {
    ${inputCSS};
  }
`

const H2 = styled.h2`
  & + * {
    margin-top: 1rem;
  }
`

const EditorWrapper = styled.div``

const editorClassName = 'content-editor'
const toolbarClassName = 'content-editor-toolbar'
const optionWrapperClassName = 'content-editor-toolbar-option-wrapper'
const inlineWrapperClassName = 'content-editor-toolbar-inline-wrapper'
const listWrapperClassName = 'content-editor-toolbar-list-wrapper'

const Editor = styled(CoreEditor).attrs({
  editorClassName,
  toolbarClassName,
  inlineWrapperClassName,
  listWrapperClassName,
  optionWrapperClassName,
})`
  .${toolbarClassName} {
    position: relative;
    padding: 0;
    border: 0;
  }

  .${editorClassName} {
    height: 20rem;

    &:focus {
      outline: 3px solid #d1e65f;
    }
  }

  .${inlineWrapperClassName}, .${listWrapperClassName} {
    margin: 0;
  }

  .rdw-editor-main {
    padding: 0 2rem;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .${optionWrapperClassName} {
    box-shadow: none;
    border: 0;
    background-color: transparent;

    &:hover {
      box-shadow: none;
    }
  }
`

const AttachDocumentOptionWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: -1px;
`

const AttachFileIcon = styled(Icon)`
  font-size: 17px !important;
  vertical-align: middle;
`

const Sub = styled.p`
  color: #7d7d7d;
`

const flatMap = fx => xs => Array.prototype.concat(...xs.map(fx))

class AttachDocumentOption extends Component {
  handleAttach = () => {}

  render() {
    return (
      <AttachDocumentOptionWrapper>
        <a onClick={this.handleAttach}>
          <AttachFileIcon>attach_file</AttachFileIcon>
          attach file
        </a>
      </AttachDocumentOptionWrapper>
    )
  }
}

export class Page extends Component {
  state = {
    serviceLabel: '',
    service: null,
    subject: '',
    editorContent: '',
  }

  setService = (services, serviceLabel) => {
    // Note: assumes service and agency names do not include a `-`.
    const [serviceName, agencyName] = serviceLabel.split('-')
    const service =
      services.filter(
        s =>
          s.name === serviceName.trim() && s.agency.name === agencyName.trim()
      )[0] || null

    this.setState({
      ...this.state,
      serviceLabel,
      service,
      subject: serviceName,
    })
  }

  setEditorContent = editorContent => {
    this.setState({
      ...this.state,
      editorContent,
    })
  }

  render() {
    const { match, history, conversations } = this.props

    return (
      <Fragment>
        <Heading>
          <H1>Message centre</H1>
        </Heading>
        <Master
          side={
            <Sidenav
              conversations={conversations}
              match={match}
              history={history}
            />
          }
        >
          <Wrapper>
            <Mutation mutation={createConversation}>
              {(create, { loading, error, data, client }) => (
                <form
                  onSubmit={e => {
                    e.preventDefault()

                    const { service, subject, editorContent } = this.state

                    if (!(service && subject && editorContent)) {
                      return
                    }

                    create({
                      variables: {
                        sentAt: new Date().toString(),
                        userID: this.props.userID,
                        serviceID: service.id,
                        subject: subject,
                        markdownSource: markdownify(editorContent),
                      },
                    })
                  }}
                >
                  <Target>
                    <Query query={queryServices}>
                      {({ loading, error, data }) =>
                        loading ? (
                          <div>loading...</div>
                        ) : (
                          <fieldset>
                            <H2>What is your message about?</H2>
                            <Label block htmlFor="service">
                              <p>
                                Enter a topic, department name, or any other
                                keyword
                              </p>
                              <Sub>eg. Release my superannuation early</Sub>
                            </Label>
                            <AutocompleteWrapper>
                              <Autocomplete
                                inputProps={{ id: 'service' }}
                                wrapperStyle={{}}
                                items={flatMap(agency => [
                                  { agency },
                                  ...agency.services.map(service => ({
                                    service,
                                    agency: service.agency,
                                  })),
                                ])(data.agencies || [])}
                                getItemValue={item =>
                                  item.service
                                    ? `${item.service.name} - ${
                                        item.agency.name
                                      }`
                                    : `${item.agency.name}`
                                }
                                renderMenu={(items, value, style) => {
                                  if (items.length === 0) {
                                    return <Fragment />
                                  }
                                  return (
                                    <Services style={style} children={items} />
                                  )
                                }}
                                renderItem={(item, active) => {
                                  if (!item.service) {
                                    return (
                                      <Agency key={item.agency.id}>
                                        {item.agency.name}
                                      </Agency>
                                    )
                                  }

                                  const ServiceC = active
                                    ? ActiveService
                                    : Service

                                  return (
                                    <ServiceC
                                      key={item.service.id}
                                      active={active}
                                    >
                                      <ServiceName>
                                        {item.service.name}
                                      </ServiceName>
                                      {item.service.description &&
                                        false && (
                                          <ServiceDescription>
                                            {item.service.description}
                                          </ServiceDescription>
                                        )}
                                    </ServiceC>
                                  )
                                }}
                                value={this.state.serviceLabel}
                                onChange={e =>
                                  this.setState({
                                    serviceLabel: e.target.value,
                                  })
                                }
                                onSelect={value =>
                                  this.setService(data.services, value)
                                }
                                isItemSelectable={item => !!item.service}
                              />
                            </AutocompleteWrapper>
                          </fieldset>
                        )
                      }
                    </Query>
                  </Target>

                  <fieldset>
                    <H2>Tell us more</H2>
                    <Label block htmlFor="content">
                      <p>
                        Please include any and all details relevant to your
                        enquiry
                      </p>
                      <Sub>note: limit is 600 characters</Sub>
                    </Label>
                    <EditorWrapper>
                      <Editor
                        id="content"
                        onContentStateChange={contentState => {
                          this.setEditorContent(contentState)
                        }}
                        toolbarCustomButtons={[<AttachDocumentOption />]}
                      />
                    </EditorWrapper>
                  </fieldset>

                  {loading ? (
                    <Submit disabled>loading...</Submit>
                  ) : (
                    <Fragment>
                      {error ? (
                        <details>
                          <summary>there was an error</summary>
                          {error.message}
                        </details>
                      ) : data ? (
                        <CacheBustingRedirect
                          client={client}
                          to={`/messages/${data.createConversation.id}`}
                        />
                      ) : null}
                      <Button
                        disabled={
                          !(
                            this.state.service &&
                            this.state.subject &&
                            this.state.editorContent
                          )
                        }
                        type="submit"
                        color="black"
                      >
                        Send message
                      </Button>
                    </Fragment>
                  )}
                </form>
              )}
            </Mutation>
          </Wrapper>
        </Master>
      </Fragment>
    )
  }
}
