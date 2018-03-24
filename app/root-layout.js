import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './components/nav-bar'
import MessagesPage from './screens/messages/messages-page'
// import NotificationsPage from './notifications-page'
// import FilesPage from './files-page'
// import SettingsPage from './settings-page'

export default class RootLayout extends Component {
  render() {
    return (
      <GridContainer>
        <NavBar />
        <PageContainer>
          <Route path="/messages" component={MessagesPage} />
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
