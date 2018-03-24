import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import { darken } from 'polished'

class ConversationListItem extends Component {
  render() {
    const { convo, match } = this.props
    const { messages } = convo
    const msg = messages[0]
    return (
      <ConvoListItem key={convo.contact.name} to={`/messages/${convo.id}`}>
        <ContactName>{convo.contact.name}</ContactName>
        <TimeStamp>{msg.timestamp}</TimeStamp>
        <MessagePreview unread={msg.read}>{msg.content}</MessagePreview>
      </ConvoListItem>
    )
  }
}

const ConvoListItem = styled(Link)`
  width: 100%;
  height: 100px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.medium};
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas: 'name status' 'msg time';
  background-color: ${({ theme }) => theme.light};

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.light)};
  }
`

const ContactName = styled.div`
  grid-area: name;
  font-size: 16px;
  color: ${({ theme }) => theme.dark};
`

const MessagePreview = styled.div`
  grid-area: msg;
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme, unread }) => (unread ? theme.dark : theme.medium)};
`
const TimeStamp = styled.div`
  grid-area: time;
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.medium};
`

export default withRouter(ConversationListItem)
