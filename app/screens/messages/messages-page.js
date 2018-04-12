import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { graphql, withApollo, compose } from 'react-apollo'
import ConversationsList from './conversations-list'
import ConversationPlaceholder from './conversation-placeholder'
import Conversation from './conversation'
import conversations from './conversation-data'
import gql from 'graphql-tag'
class MessagesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations,
    }
  }

  render() {
    console.log('Proppies!', this.props)
    const { match, data } = this.props
    let { conversations } = this.state
    if (!data.loading && data.me) {
      conversations = data.me.conversations
    }
    let activeConversation
    if (match.params.id) {
      activeConversation = conversations.find(conversation => {
        return conversation.id === match.params.id
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

const meQuery = gql`
  query me {
    me {
      id
      conversations {
        id
        messages {
          body
          address
          date
          userSent
        }
        participants {
          name
          phone
        }
      }
    }
  }
`

const withMe = graphql(meQuery, {
  options: props => ({}),
})

export default withApollo(withMe(withRouter(MessagesPage)))
