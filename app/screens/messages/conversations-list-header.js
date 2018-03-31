import React, { Component } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'

export default class ConversationListHeader extends Component {
  render() {
    return (
      <Container>
        <SearchBar type="text" placeholder="Search" />
        <NewMessageButton>+</NewMessageButton>
      </Container>
    )
  }
}

const Container = styled.div`
  -webkit-app-region: drag;
  display: flex;
  padding: 8px;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
`

const SearchBar = styled.input`
  height: 32px;
  color: ${({ theme }) => theme.dark};
  background-color: ${({ theme }) => transparentize(0.8, theme.medium)};
  border-radius: 8px;
  display: flex;
  padding: 0 12px;
  border: none;
  &::placeholder {
    color: ${({ theme }) => theme.medium};
  }
  -webkit-app-region: no-drag;
`

const NewMessageButton = styled.div`
  background-color: ${({ theme }) => theme.light};
  color: ${({ theme }) => theme.medium};
  width: 24px;
  height: 24px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`
