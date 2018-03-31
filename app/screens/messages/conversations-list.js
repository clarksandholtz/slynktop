import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import ConversationsListItem from './conversation-list-item'
import ConversationListhHeader from './conversations-list-header'

class ConversationsList extends Component {
  renderConversations = () => {
    const { conversations, match } = this.props
    return conversations.map(convo => {
      return <ConversationsListItem key={convo.contact.name} convo={convo} />
    })
  }

  render() {
    return (
      <ListContainer>
        <ConversationListhHeader />
        {this.renderConversations()}
      </ListContainer>
    )
  }
}

const ListContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.light};
  grid-area: master;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  z-index: 1;
`

export default withRouter(ConversationsList)
