import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

const IP = 'localhost'

const httpLink = new HttpLink({
  uri: `http://${IP}:4000`,
})

const wsLink = new WebSocketLink({
  uri: `ws://${IP}:5000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjamYwYjNhaXQwMDA2MDEzOXAzd2Ewem50IiwiaWF0IjoxNTIyNzk4NTc5fQ.rReshM3S0NLrmajIShb85qRgyjQGLydcSKKgiDB8oaU', //localStorage.getItem('token') || null,
    },
  },
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjamZzcW9zMnEwMDBuMDkxMWZldjFvNmdrIiwiaWF0IjoxNTIzMzEyNDMwfQ.rVIbcjSNj_4vFMltci8XDFgIJPxmXQCV3GS-vSU1d4w', //localStorage.getItem('token') || null,
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
