import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import ConversationsListItem from './conversation-list-item'

class ConversationsList extends Component {
  renderConversations = () => {
    const { conversations, match } = this.props
    return conversations.map(convo => {
      return <ConversationsListItem key={convo.contact.name} convo={convo} />
    })
  }

  render() {
    return <ListContainer>{this.renderConversations()}</ListContainer>
  }
}

const ListContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.light};
  grid-area: master;
`

export default withRouter(ConversationsList)
