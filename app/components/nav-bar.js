import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NavTab from './nav-tab'

const tabs = [
  {
    title: 'Messages',
    route: '/messages',
    // icon: some svg
  },
  {
    title: 'Notifications',
    route: '/notifications',
    // icon: some svg
  },
  {
    title: 'Settings',
    route: '/settings',
    // icon: some svg
  },
]

export default class NavBar extends Component {
  renderTab = () => {
    return tabs.map((tab, index) => {
      return <NavTab key={index} {...tab} />
    })
  }

  render() {
    return (
      <NavContainer>
        {/* <LogoIcon /> */}
        {this.renderTab()}
      </NavContainer>
    )
  }
}

const NavContainer = styled.div`
  -webkit-app-region: drag;
  padding: 22px 0 0 0;
  background-color: ${({ theme }) => theme.dark};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
