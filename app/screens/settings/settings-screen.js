import React, { Component } from 'react'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ThemerActions from '../../actions/themer'
import themes from '../../themes'

function mapStateToProps(state) {
  return {
    themer: state.themer,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ThemerActions, dispatch)
}

class SettingsScreen extends Component {
  handleLogout = e => {
    e.preventDefault()
    // clear local storage and apollo client store
  }

  changeTheme = e => {
    const themeNames = Object.keys(themes)
    const index = Math.floor(Math.random() * themeNames.length)
    console.log(themeNames[index])
    this.props.changeTheme(themeNames[index])
  }

  render() {
    return (
      <Container>
        <QuickButton onClick={this.handleLogout}>Logout</QuickButton>
        <QuickButton onClick={this.changeTheme}>Change Theme</QuickButton>
      </Container>
    )
  }
}

const QuickButton = styled.div`
  padding: 8px 12px;
  border-radius: 32px;
  height: 32px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.light}
  align-self: center;
  justify-self: center;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.18);
  border: none;
  &:hover {
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.18);
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
