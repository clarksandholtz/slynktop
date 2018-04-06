import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import styled from 'styled-components'
import ConversationsList from './conversations-list'
import ConversationPlaceholder from './conversation-placeholder'
import Conversation from './conversation'
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
    let activeConversation
    if (match.params.id) {
      activeConversation = conversations.find(conversation => {
        return conversation.id == match.params.id
      })
    }
    return (
      <MessagesPageContainer>
        <ConversationsList conversations={conversations} />
        <Switch>
          <Route path="/messages/:id">
            <Conversation convo={activeConversation} />
          </Route>
          <Route path="/messages" component={ConversationPlaceholder} />
        </Switch>
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
