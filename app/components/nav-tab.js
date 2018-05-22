import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export default class NavTab extends Component {
  static propTypes = {
    title: PropTypes.string,
    route: PropTypes.string.isRequired,
  }

  render() {
    const { route, icon: iconName } = this.props
    return (
      <TabLink to={route}>
        <i className="material-icons">{iconName}</i>
      </TabLink>
    )
  }
}

const TabLink = styled(NavLink)`
  height: 68px;
  width: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.light};
  &[aria-current='true'] {
    background-color: ${({ theme }) => theme.primary};

    &:hover {
      background-color: ${({ theme }) => theme.primary};
    }
  }
`
