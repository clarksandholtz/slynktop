// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ConnectedRouter } from 'react-router-redux'
import { ApolloProvider } from 'react-apollo';
import Routes from './routes'
import themes from './themes'
import client from './client'

type Props = {
  store: {},
  history: {},
}
export default class Root extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={this.props.store}>
          <ConnectedRouter history={this.props.history}>
            <ThemeProvider theme={themes[this.props.store.getState().themer]}>
              <Routes />
            </ThemeProvider>
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    )
  }
}
