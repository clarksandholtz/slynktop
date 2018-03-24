import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import MessageBar from './message-bar'
import Thread from './Thread'

class Conversation extends Component {
  render() {
    const { convo } = this.props
    return (
      <Container>
        <MessageBar />
        <Thread convo={convo} />
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default withRouter(Conversation)
