/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './containers/App'
import LandingPage from './containers/landing-page'
import RootLayout from './containers/root-layout'
// import NoDevicePage from './containers/NoDevicePage';
// import CreateAccountPage from './containers/NoDevicePage'

export default () => (
  <App>
    <Switch>
      <Route path="/messages" component={RootLayout} />
      {/* <Route path="/create-account" component={CreateAccountPage} />
      <Route path="/no-device" component={NoDevicePage} /> */}
      <Route path="/" component={LandingPage} />
    </Switch>
  </App>
)
