import React, { Component } from 'react'
import { Route, withRouter } from 'react-router'
import styled from 'styled-components'
import ConversationsList from '../components/conversations-list'

class MessagesPage extends Component {
  constructor(props) {
    super(props)

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
    const activeConversation = conversations.find(convo => {
      console.log(match)
      return match.path.includes(convo.id)
    })
    return (
      <Route path="/messages">
        <MessagesPageContainer>
          <ConversationsList conversations={conversations} />
        </MessagesPageContainer>
      </Route>
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
