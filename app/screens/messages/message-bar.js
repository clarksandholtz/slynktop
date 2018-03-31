import React, { Component } from 'react'
import styled from 'styled-components'

export default class MessageBar extends Component {
  render() {
    return <MessageBarContainer />
  }
}

const MessageBarContainer = styled.div`
  grid-area: message-bar;
  background-color: ${({ theme }) => theme.dark};
  width: 100%;
  padding: 16px;
  height: 32px;
`
