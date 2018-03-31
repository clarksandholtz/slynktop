import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import MessageBar from './message-bar'
import Thread from './Thread'

class Conversation extends Component {
  render() {
    const { convo } = this.props
    return (
      <Container>
        <ConversationHeader>{convo.contact.name}</ConversationHeader>
        <Thread convo={convo} />
        <MessageBar />
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'thread'
    'message-bar';
`

const ConversationHeader = styled.div`
  grid-area: header;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  padding: 8px 0;
`

export default withRouter(Conversation)
