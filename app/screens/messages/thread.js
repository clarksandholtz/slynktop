import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Message from './message'

class Thread extends Component {
  renderMessages = () => {
    const { convo: { messages } } = this.props
    if (!messages) return null
    return messages.map(msg => <Message message={msg} />)
  }

  render() {
    return <ThreadContainer>{this.renderMessages()}</ThreadContainer>
  }
}

const ThreadContainer = styled.div`
  grid-area: thread;
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.light};
  overflow-y: scroll;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 16px 16px 0 16px;
`

export default withRouter(Thread)
