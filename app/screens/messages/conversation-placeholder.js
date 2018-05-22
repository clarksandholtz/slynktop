import React, { Component } from 'react'
import styled from 'styled-components'

export default class ConversationPlaceholder extends Component {
  render() {
    return <PlaceholderMessage>CLICK A CONVERSATION!</PlaceholderMessage>
  }
}

const PlaceholderMessage = styled.div`
  color: ${({ theme }) => theme.dark};
`
