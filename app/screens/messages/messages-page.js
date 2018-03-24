import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import ConversationsList from './conversations-list'
import Conversation from './conversation'

class MessagesPage extends Component {
  constructor(props) {
    super(props)

    console.log('constructiong')

    this.state = {
      conversations: [
        {
          id: 1,
          contact: {
            name: 'Bob Ross',
          },
          messages: [
            {
              read: true,
              content: 'DO YOU LIKE TO PAINT!',
              timestamp: 'Just now',
              inbound: true,
            },
          ],
        },
        {
          id: 2,
          contact: {
            name: 'Black Panther',
          },
          messages: [
            {
              read: true,
              content: "Don't freeze",
              timestamp: 'Yesterday',
              inbound: false,
            },
            {
              read: false,
              content: 'I NEVER FREEZE!',
              timestamp: 'Yesterday',
              inbound: true,
            },
          ],
        },
      ],
    }
  }

  render() {
    const { match } = this.props
    const { conversations } = this.state
    const activeConversation = conversations
    return (
      <MessagesPageContainer>
        <ConversationsList conversations={conversations} />
        <Conversation convo={activeConversation} />
      </MessagesPageContainer>
    )
  }
}

const MessagesPageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(100px, 20%) 80%;
  grid-template-areas: 'master detail';
  background-color: ${({ theme }) => theme.light};
`

export default withRouter(MessagesPage)
