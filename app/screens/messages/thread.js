import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Message from './message'

class Thread extends Component {
  renderMessages = () => {
    const { convo: { messages } } = this.props
    if (!messages) return null
    return messages.map((msg, index) => (
      <Message
        message={msg}
        isLast={
          index === messages.length - 1 ||
          msg.inbound !== messages[index + 1].inbound
        }
      />
    ))
  }

  render() {
    return <ThreadContainer>{this.renderMessages()}</ThreadContainer>
  }
}

const ThreadContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.light};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  flex-shrink: 1;
  flex-grow: 1;
`

export default withRouter(Thread)
