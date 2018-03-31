import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import ConversationsList from './conversations-list'
import Conversation from './conversation'
import ConversationsListHeader from './conversations-list-header'
import conversations from './conversation-data'

class MessagesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations,
    }
  }

  render() {
    const { match } = this.props
    const { conversations } = this.state
    const activeConversation = conversations[1]
    return (
      <MessagesPageContainer>
        <ConversationsList conversations={conversations} />
        <Conversation convo={activeConversation} />
      </MessagesPageContainer>
    )
  }
}

const MessagesPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(260px, 20%) 1fr;
  grid-template-areas: 'master detail';
  background-color: ${({ theme }) => theme.light};
`

export default withRouter(MessagesPage)
