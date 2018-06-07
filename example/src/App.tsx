import * as React from 'react'
import './App.css'

import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import {HttpLink} from 'apollo-link-http'
import ApolloClient from 'apollo-client'

const cache = new InMemoryCache({fragmentMatcher})

const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: 'https://us1.prisma.sh/peter-eb07be/inbox-prisma/dev',
  }),
  shouldBatch: true,
  cache,
})

const Pages = props => <div>yeah boy</div>

const App = ({client}) => (
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>
)

export default class ClientApp extends Component {
  render() {
    return <App client={client} />
  }
}
