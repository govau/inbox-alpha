import React, { Component, Fragment } from 'react'
import markdownify from 'draftjs-to-markdown'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Autocomplete from 'react-autocomplete'

import Master from '../../components/layout'
import { Button } from '../../components/button'
import CoreEditor from '../../components/editor'
import CacheBustingRedirect from '../../components/cache-busting-redirect'
import { Submit, inputCSS } from '../../components/forms'
import { Heading, H1, Sidenav } from './components'

const queryServices = gql`
  query {
    services {
      id
      name
      description
      contactNo
      agency {
        name
      }
    }
  }
`

const createConversation = gql`
  mutation(
    $userID: ID!
    $serviceID: ID!
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
            sender: { create: { source: User } }
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
    max-width: 50rem;
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

  & + & {
    margin-top: 0;
    border-top: 1px solid #eee;
  }
`

const ServiceName = styled.div``

const ServiceDescription = styled.div`
  margin-top: 0;
  opacity: 0.7;
  font-size: 0.8em;
`

const ActiveService = styled(Service)`
  ${ServiceName} {
    font-weight: bold;
  }
`

const AutocompleteWrapper = styled.div`
  input {
    ${inputCSS};
  }
`

const EditorWrapper = styled.div`
  padding: 2rem;
  background-color: #eee;
`

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
    padding: 0;
    border: 0;
    background-color: #eee;
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

export class Page extends Component {
  state = {
    serviceLabel: '',
    service: null,
    subject: '',
    editorContent: '',
  }

  setService = (services, serviceLabel) => {
    const [serviceName, agencyName] = serviceLabel.split('@')
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
                    create({
                      variables: {
                        userID: this.props.userID,
                        serviceID: this.state.service.id,
                        subject: this.state.subject,
                        markdownSource: markdownify(this.state.editorContent),
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
                            <label htmlFor="service">Subject</label>
                            <AutocompleteWrapper>
                              <Autocomplete
                                inputProps={{ id: 'service' }}
                                wrapperStyle={{}}
                                items={data.services || []}
                                shouldItemRender={(service, value) =>
                                  service.name
                                    .toLowerCase()
                                    .indexOf(value.toLowerCase()) > -1 ||
                                  service.agency.name
                                    .toLowerCase()
                                    .indexOf(value.toLowerCase()) > -1
                                }
                                getItemValue={service =>
                                  `${service.name} @ ${service.agency.name}`
                                }
                                renderMenu={(items, value, style) => {
                                  if (items.length === 0) {
                                    return <Fragment />
                                  }
                                  return (
                                    <Services style={style} children={items} />
                                  )
                                }}
                                renderItem={(service, active) => {
                                  const ServiceC = active
                                    ? ActiveService
                                    : Service

                                  return (
                                    <ServiceC key={service.id} active={active}>
                                      <ServiceName>
                                        {service.name} @ {service.agency.name}
                                      </ServiceName>
                                      {service.description && (
                                        <ServiceDescription>
                                          {service.description}
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
                              />
                            </AutocompleteWrapper>
                          </fieldset>
                        )
                      }
                    </Query>
                  </Target>

                  <fieldset>
                    <label htmlFor="content">Write message</label>
                    <EditorWrapper>
                      <Editor
                        id="content"
                        onContentStateChange={contentState => {
                          this.setEditorContent(contentState)
                        }}
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
                      <Button type="submit">Send</Button>
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
