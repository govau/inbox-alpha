import React, { Component, Fragment } from 'react'
import markdownify from 'draftjs-to-markdown'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Autocomplete from 'react-autocomplete'

import Master from '../../components/layout'
import Icon from '../../components/icon'
import IconLink from '../../components/icon-link'
import Editor from '../../components/editor'
import CacheBustingRedirect from '../../components/cache-busting-redirect'
import { Text, Submit } from '../../components/forms'
import { Heading, H1 } from './components'

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

const HiddenText = styled(Text)`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`

const GiveThisABetterName = ({ services = [], serviceID, children }) => {
  const service = services.find(service => service.id === serviceID)
  return service ? children({ service }) : null
}

export class Page extends Component {
  state = {
    searchValue: '',
    editorContent: '',
  }

  setEditorContent = editorContent => {
    this.setState({
      ...this.state,
      editorContent,
    })
  }

  setSearchValue = searchValue => {
    this.setState({
      ...this.state,
      searchValue,
    })
  }

  render() {
    return (
      <Fragment>
        <Heading>
          <H1>Message centre</H1>
        </Heading>
        <Master>
          <Wrapper>
            <IconLink to="/messages" icon={<Icon>arrow_back</Icon>}>
              Back
            </IconLink>
            <Mutation mutation={createConversation}>
              {(create, { loading, error, data, client }) => (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    create({
                      variables: {
                        userID: this.props.userID,
                        serviceID: this.state.searchValue,
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
                          <Autocomplete
                            value={this.state.searchValue}
                            onChange={e => this.setSearchValue(e.target.value)}
                            onSelect={this.setSearchValue}
                            getItemValue={item => item.id}
                            items={data.services || []}
                            renderMenu={(items, value, style) => (
                              <Services style={style} children={items} />
                            )}
                            renderInput={({ ref, ...props }) => (
                              <label>
                                <span>
                                  To:{' '}
                                  <GiveThisABetterName
                                    services={data.services}
                                    serviceID={this.state.searchValue}
                                  >
                                    {({ service }) => (
                                      <Fragment>
                                        <ServiceName>
                                          {service.name} @ {service.agency.name}
                                        </ServiceName>
                                        {service.description && (
                                          <ServiceDescription>
                                            {service.description}
                                          </ServiceDescription>
                                        )}
                                      </Fragment>
                                    )}
                                  </GiveThisABetterName>
                                </span>
                                <HiddenText
                                  style={{ visibility: 'none' }}
                                  reference={ref}
                                  {...props}
                                />
                              </label>
                            )}
                            renderItem={(service, active) => {
                              const ServiceC = active ? ActiveService : Service

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
                          />
                        )
                      }
                    </Query>
                  </Target>

                  <Text required placeholder="Subject" />
                  <Editor
                    onContentStateChange={contentState => {
                      this.setEditorContent(contentState)
                    }}
                  />

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
                      <Submit>Send</Submit>
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
