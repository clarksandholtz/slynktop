import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Message from './message'

class Thread extends Component {
  renderMessages = () => {
    const { convo: { messages } } = this.props
    return messages.map(msg => <Message message={msg} />)
  }

  render() {
    return <ThreadContainer>{this.renderMessages()}</ThreadContainer>
  }
}

const ThreadContainer = styled.div`
  grid-area: thread;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.light};
  overflow-y: scroll;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`

export default withRouter(Thread)
