// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ConnectedRouter } from 'react-router-redux'
import Routes from './routes'
import themes from './themes'

type Props = {
  store: {},
  history: {},
}

export default class Root extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <ThemeProvider theme={themes[this.props.store.getState().themer]}>
            <Routes />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}
