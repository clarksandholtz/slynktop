import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NavTab from './nav-tab'
import Icon from '../components/icon'

const tabs = [
  {
    title: 'Messages',
    route: '/messages',
    icon: 'message',
  },
  {
    title: 'Notifications',
    route: '/notifications',
    icon: 'notifications',
  },
  {
    title: 'Settings',
    route: '/settings',
    icon: 'settings',
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
        <LogoContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="34"
            viewBox="0 0 50 34"
          >
            <g fill="#73BA9B" fillRule="evenodd">
              <rect width="18" height="2" y="32" rx="1" />
              <rect width="18" height="2" y="28" rx="1" />
              <rect width="18" height="2" y="24" rx="1" />
              <rect
                width="18"
                height="2"
                y="18"
                rx="1"
                transform="rotate(18 9 19)"
              />
              <rect
                width="18"
                height="2"
                x="5"
                y="11"
                rx="1"
                transform="rotate(52 14 12)"
              />
              <rect
                width="18"
                height="2"
                x="13"
                y="8"
                rx="1"
                transform="rotate(90 22 9)"
              />
              <rect
                width="18"
                height="2"
                x="32"
                y="32"
                rx="1"
                transform="matrix(-1 0 0 1 82 0)"
              />
              <rect
                width="18"
                height="2"
                x="32"
                y="28"
                rx="1"
                transform="matrix(-1 0 0 1 82 0)"
              />
              <rect
                width="18"
                height="2"
                x="32"
                y="24"
                rx="1"
                transform="matrix(-1 0 0 1 82 0)"
              />
              <rect
                width="18"
                height="2"
                x="32"
                y="18"
                rx="1"
                transform="scale(-1 1) rotate(18 0 -239.864)"
              />
              <rect
                width="18"
                height="2"
                x="27"
                y="11"
                rx="1"
                transform="scale(-1 1) rotate(52 0 -61.81)"
              />
              <rect
                width="18"
                height="2"
                x="19"
                y="8"
                rx="1"
                transform="matrix(0 1 1 0 19 -19)"
              />
            </g>
          </svg>
        </LogoContainer>
        {this.renderTab()}
      </NavContainer>
    )
  }
}

const NavContainer = styled.div`
  -webkit-app-region: drag;
  padding: 12px 0 0 0;
  background-color: ${({ theme }) => theme.dark};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const LogoContainer = styled.div`
  width: 68px;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
`
