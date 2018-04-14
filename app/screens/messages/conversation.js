import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import MessageBar from './message-bar'
import Thread from './Thread'

class Conversation extends Component {
  render() {
    const { convo } = this.props
    if (!convo) return null
    const { participants } = convo
    const names = participants.map(p => p.name).join(', ')
    const address = participants.map(p => p.phone).join(' ')
    return (
      <Container>
        <ConversationHeader>{names}</ConversationHeader>
        <Thread convo={convo} />
        <MessageBar address={address} />
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
`

const ConversationHeader = styled.div`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  background-color: rgba(0, 0, 0, 0);
  padding: 8px 0;
  -webkit-app-region: drag;
  flex-shrink: 0;
  flex-grow: 0;
`

export default withRouter(Conversation)
