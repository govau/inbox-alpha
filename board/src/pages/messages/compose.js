import React, { Component, Fragment } from 'react'
import markdownify from 'draftjs-to-markdown'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Autocomplete from 'react-autocomplete'

import Editor from '../../components/editor'
import { Text } from '../../components/forms'

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

const Wrapper = styled.section``

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

class Compose extends Component {
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
      <Wrapper>
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
                    <Text reference={ref} {...props} />
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

        <Editor
          onContentStateChange={contentState => {
            this.setEditorContent(markdownify(contentState))
          }}
        />
      </Wrapper>
    )
  }
}

export default Compose
