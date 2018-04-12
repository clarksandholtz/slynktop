import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import Textarea from 'react-textarea-autosize'

export default class MessageBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messageText: '',
    }
  }

  static propTypes = {
    address: PropTypes.string.isRequired,
  }

  sendMessage = () => {
    const messageText = ''
    this.setState({ messageText })
  }

  onKeyDown = event => {
    var code = event.keyCode || event.which
    if (code === 13) {
      //13 is the enter keycode
      //Do stuff in here
      if (event.shiftKey) {
        // console.log('SHIFTED')
        const index = event.target.selectionStart
        const messageText =
          this.state.messageText.slice(0, index) +
          '\n' +
          this.state.messageText.slice(index)
        // console.log(messageText)
        this.setState({ messageText })
      } else {
        this.sendMessage()
      }
    }
  }

  handleTextChange = event => {
    event.persist()
    const messageText = event.target.value
    this.setState({ messageText })
  }

  render() {
    const { messageText } = this.state
    return (
      <MessageBarContainer>
        <AttachButton>+</AttachButton>
        <MessageInput
          type="text"
          onChange={this.handleTextChange}
          onKeyDown={this.onKeyDown}
          value={messageText}
        />
      </MessageBarContainer>
    )
  }
}

const AttachButton = styled.div`
  background-color: ${({ theme }) => theme.primary};
  height: 40px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  flex-grow: 0;
  width: 48px;
  color: ${({ theme }) => theme.light};
  text-align: center;
  line-height: 40px;
  font-size: 32px;
  &:hover {
    cursor: pointer;
  }
`

const MessageInput = styled.input`
  background-color: ${({ theme }) => theme.light};
  height: 40px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  flex-grow: 1;
  padding: 8px;
  color: ${({ theme }) => theme.dark};
  border: 1px solid rgba(0, 0, 0, 0.1);
`
const MessageBarContainer = styled.div`
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  width: calc(100% - 32px);
  margin: 0 16px 16px 16px;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`
