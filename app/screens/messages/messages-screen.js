import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { graphql, withApollo, compose } from 'react-apollo'
import ConversationsList from './conversations-list'
import ConversationPlaceholder from './conversation-placeholder'
import Conversation from './conversation'
import gql from 'graphql-tag'
import { KEY_TOKEN } from '../../modules/auth'
var _ = require('lodash')

class MessagesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations: [],
    }

    this.initialSync = true
    this.conversationLengths = {}
    this.subscription = null
    this.conversationPoller = null
  }

  addMessageToConversation = (newMessage) => {
    this.setState({conversations: this.state.conversations.find((convo)=>convo.threadId === newMessage.threadId).push(newMessage)})
    if (!newMessage.userSend) {
      const from = _.pluck(this.state.conversations, 'name').join(", ")
      let notification = new Notification(from, {
        body: newMessage.body,
        data: newMessage.sender,
      })
      notification.onclick = () => {
        //Go to conversation
      } 
    }
  }

  fetchConversations = async () => {
    const { client } = this.props
    const { data } = await client.query({ query: allConversationsQuery })
    if (data && data.allConversations) {
      this.setState({ conversations: data.allConversations })
    } else {
      console.error(data)
      alert('Oops, syncing went a lil funky!')
    }
  }

  startMessagesSub = async () => {
    const { client } = this.props
    const token = localStorage.getItem(KEY_TOKEN)
    this.subscription = await client.subscribe({  query: createNewMessageSubscription, variables: { token } })
    this.subscription.subscribe({
      next(res) {
        const { newMessage } = res.data
        this.newMessage(newMessage) 
      },
      error(err) {
        console.error(err)
      },
    })
  }

  async componentDidMount() {
    Notification.requestPermission(function(permission) {
      if (permission !== 'granted') {
        console.log("Error getting permissions for notification access")
      }
    })
    this.fetchConversations()
    this.startMessagesSub()
  }

  componentWillUnmount() {
    if (this.subscription != null) {
      this.subscription.unsubscribe()
    }
    this.subscription = null

    if (this.interval != null) {
      clearInterval(this.interval)
    }
    this.interval = null
  }

  render() {
    const { match } = this.props
    let { conversations } = this.state
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

const allConversationsQuery = gql`
  query allConversations {
    allConversations {
      id
      threadId
      messages {
        body
        address
        date
        userSent
        files {
          contentType
          content
          uploaded
        }
      }
      participants {
        name
        phone
      }
    }
  }
`

const createNewMessageSubscription = gql`
  subscription newMessage($token: String!) {
    newMessage(token: $token) {
      userSent
      androidMsgId
      id
      address
      sender
      read
      body
      threadId
      error
      date
      files {
        id
        contentType
        content
        uploaded
      }
    }
  }
`

export default withApollo(withRouter(MessagesScreen))
