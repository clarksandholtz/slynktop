import React, { Component } from 'react'
import styled from 'styled-components'

export default class Message extends Component {
  render() {
    const { message: { content, timestamp, inbound } } = this.props
    return (
      <Wrapper>
        <Bubble inbound={inbound}>
          <MessageText>{content}</MessageText>
        </Bubble>
        <TimestampText>{timestamp}</TimestampText>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  align-self: ${({ inbound }) => (inbound ? 'flex-start' : 'flex-end')};
  display: flex;
  flex-direction: column;
  align-items: ${({ inbound }) => (inbound ? 'flex-start' : 'flex-end')};
`

const Bubble = styled.div`
  background-color: ${({ inbound, theme }) =>
    inbound ? theme.primary : theme.dark};
  padding: 8px;
  border-radius: 12px;
`

const MessageText = styled.div`
  text-align: left;
  line-height: 1.2;
  color: ${({ theme }) => theme.light};
`

const TimestampText = styled.div`
  color: ${({ theme }) => theme.medium};
  inbound: ;
`
