import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { graphql, withApollo, compose } from 'react-apollo'
import ConversationsList from './conversations-list'
import ConversationPlaceholder from './conversation-placeholder'
import Conversation from './conversation'
import conversations from './conversation-data'
import gql from 'graphql-tag'
import { KEY_TOKEN } from '../../modules/auth'

class MessagesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations,
    }

    this.subscription = null
  }

  fetchConversations = async () => {
    const { client } = this.props
    const { data } = await client.query({ query: meQuery })
    if (data && data.me && data.me.conversations) {
      this.setState({ conversations: data.me.conversations })
    } else {
      console.error(data)
      alert('Oops, syncing went a lil funky!')
    }
  }

  startMessagesSub = async () => {
    console.log('PROPPIES!!!', this.props)
    const { client } = this.props
    const token = localStorage.getItem(KEY_TOKEN)
    this.subscription = await client
      .subscribe({ query: createNewMessageSubscription, variables: { token } })
      .subscribe({
        next(data) {
          console.log('SUBDUB: ', data)
        },
        error(err) {
          console.table({ hello: 'yup' })
          console.log(Object.keys(err))
          console.error(err)
        },
      })
  }

  async componentDidMount() {
    this.fetchConversations()
    this.startMessagesSub()
  }

  componentWillUnmount() {
    if (this.subscription != null) {
      this.subscription.unsubscribe()
    }
    this.subscription = null
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
