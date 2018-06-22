import React, { Component, Fragment } from 'react'
import markdownify from 'draftjs-to-markdown'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

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
  display: none;
  list-style: none;
  padding: 0;
  border: 1px solid #eee;
`

const Search = styled(Text)`
  &:focus + ${Services} {
    display: block;
  }
`

const Service = styled.li`
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
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

class Compose extends Component {
  state = { editorContent: '' }

  setEditorContent = editorContent => {
    this.setState({
      ...this.state,
      editorContent,
    })
  }

  render() {
    return (
      <Wrapper>
        <Target>
          <span>To:</span>
          <Query query={queryServices}>
            {({ loading, error, data }) =>
              loading ? (
                <div>loading...</div>
              ) : (
                <Fragment>
                  <Search placeholder="agency or service" />
                  <Services>
                    {(data.services || []).map((service, i) => (
                      <Service>
                        <ServiceName>
                          {service.name} @ {service.agency.name}
                        </ServiceName>
                        {service.description && (
                          <ServiceDescription>
                            {service.description}
                          </ServiceDescription>
                        )}
                      </Service>
                    ))}
                  </Services>
                </Fragment>
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
