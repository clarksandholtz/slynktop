import React, { Component } from 'react'
import styled from 'styled-components'

export default class Message extends Component {
  render() {
    const { message: { content, timestamp, inbound }, isLast } = this.props
    return (
      <Wrapper inbound={inbound} isLast={isLast}>
        <Bubble inbound={inbound}>
          <MessageText>{content}</MessageText>
        </Bubble>
        {isLast && <TimestampText>{timestamp}</TimestampText>}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  align-self: ${({ inbound }) => (inbound ? 'flex-start' : 'flex-end')};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

const Bubble = styled.div`
  background-color: ${({ inbound, theme }) =>
    inbound ? theme.primary : theme.dark};
  padding: 8px;
  flex-shrink: 0;
  border-radius: 12px;
  margin-bottom: 4px;
`

const MessageText = styled.div`
  text-align: left;
  line-height: 1.2;
  flex-shrink: 0;
  color: ${({ theme }) => theme.light};
`

const TimestampText = styled.div`
  color: ${({ theme }) => theme.medium};
  flex-shrink: 0;
  margin-left: 4px;
`
