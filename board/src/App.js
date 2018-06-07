import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import config from './config'
import Pages from './pages'

const client = new ApolloClient({
  uri: config.graphqlHost,
})

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>
)

export default class ClientApp extends Component {
  render() {
    return <App client={client} />
  }
}
