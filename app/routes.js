/* eslint flowtype-errors/show-errors: 0 */
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import LandingPage from './screens/auth/landing-page'
import RootLayout from './root-layout'
// import NoDevicePage from './containers/NoDevicePage';
// import CreateAccountPage from './containers/NoDevicePage'

export default class AuthGate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false,
    }
  }

  toggleAuth = () => {
    this.setState({
      authenticated: !this.state.authenticated,
    })
  }

  render() {
    const { authenticated } = this.state
    return (
      <App>
        {authenticated ? (
          <Route path="/" component={RootLayout} />
        ) : (
          <LandingPage toggleAuth={this.toggleAuth} />
        )}
      </App>
    )
  }
}
