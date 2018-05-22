import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { KEY_TOKEN } from './modules/auth'

const IP = 'localhost'

const httpLink = new HttpLink({
  uri: `http://${IP}:4000`,
})

const wsLink = new WebSocketLink({
  uri: `ws://${IP}:5000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      // authToken: token ? `Bearer ${token}` : '',
    },
  },
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem(KEY_TOKEN)
  console.log('TOKEN!!!', token)

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      'Cache-Control': 'no-cache',
      timestamp: new Date().toISOString(),
    },
  })
  return forward(operation)
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  concat(authMiddleware, httpLink),
)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

export default client
