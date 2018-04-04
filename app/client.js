import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
// import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
 
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   //const token = localStorage.getItem('token');
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjamYwYjNhaXQwMDA2MDEzOXAzd2Ewem50IiwiaWF0IjoxNTIyNzk4NTc5fQ.rReshM3S0NLrmajIShb85qRgyjQGLydcSKKgiDB8oaU"
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

const client = new ApolloClient({
  link: httpLink,//authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client