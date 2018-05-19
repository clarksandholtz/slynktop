import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { graphql, withApollo, compose } from 'react-apollo'
import ConversationsList from './conversations-list'
import ConversationPlaceholder from './conversation-placeholder'
import Conversation from './conversation'
import gql from 'graphql-tag'
import { KEY_TOKEN } from '../../modules/auth'

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

  fetchConversations = async () => {
    const { client } = this.props
    const { data } = await client.query({ query: allConversationsQuery })
    if (data && data.allConversations) {
      console.log(JSON.stringify(data.allConversations))
      this.setState({ conversations: data.allConversations })
    } else {
      console.error(data)
      alert('Oops, syncing went a lil funky!')
    }
  }

  startMessagesSub = async () => {
    const { client } = this.props
    const token = localStorage.getItem(KEY_TOKEN)
    this.subscription = await client
      .subscribe({ query: createNewMessageSubscription, variables: { token } })
      .subscribe({
        next(data) {
          console.log('SUBDUB: ', data)
        },
        error(err) {
          console.error(err)
        },
      })
  }

  async componentDidMount() {
    Notification.requestPermission(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        let testNotification = new Notification('Test', {
          body: 'This is a test',
          data: 'Number',
        })
        testNotification.onclick = () => {
          console.log(testNotification)
        }
      }
    })

    this.fetchConversations()
    //this.startMessagesSub()
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

  addMessageToConversation = () => {
    // const correctConversation =
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
  query newMessage($token: String!) {
    subscription
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
