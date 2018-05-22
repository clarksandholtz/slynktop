import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/nav-bar'
import MessagesScreen from './screens/messages/messages-screen'
import SettingsScreen from './screens/settings/settings-screen'
// import NotificationsPage from './notifications-page'
// import FilesPage from './files-page'
// import SettingsPage from './settings-page'

export default class RootLayout extends Component {
  render() {
    return (
      <GridContainer>
        <NavBar />
        <PageContainer>
          <Switch>
            <Route path="/messages/:id" component={MessagesScreen} />
            <Route path="/messages" component={MessagesScreen} />
          </Switch>
          <Route path="/settings" component={SettingsScreen} />
          {/* <NotificationsPage />
          <FilesPage />
          <SettingsPage /> */}
        </PageContainer>
      </GridContainer>
    )
  }
}

const GridContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 68px 1fr;
  grid-template-areas: 'nav page';
`

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  grid-area: page;
`
