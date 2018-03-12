import React, { Component } from 'react'
import styled from 'styled-components'
import * as firebase from 'firebase'
import { OAuth2Provider } from 'electron-oauth-helper'
import querystring from 'querystring'
import { Link } from 'react-router-dom'

export default class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false,
    }
  }

  handleAuthClick = () => {
    const config = {
      client_id:
        '598493394141-i17q0hqrhg8ujnjgqic0gg7d4g5gimd1.apps.googleusercontent.com',
      client_secret: 'WxwdiwIeMP2BZbdhy0CWv2sH',
      redirect_uri: 'https://slyncy-c0f11.firebaseapp.com/__/auth/handler',
      authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
      response_type: 'token',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/contacts.readonly',
    }

    const provider = new OAuth2Provider(config)
    provider
      .perform()
      .then(resp => {
        const query = querystring.parse(resp)
        const access_token = query.access_token
          ? query.access_token
          : resp.access_token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          null,
          access_token,
        )
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            console.table(user)
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }

  render() {
    return (
      <Container>
        <LogoContainer />
        <AuthButton to="/messages">
          <ButtonText>Sign in with Google</ButtonText>
        </AuthButton>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.primary};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    '. logo   .'
    '. button .';
`

const LogoContainer = styled.div`
  grid-area: logo;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AuthButton = styled(Link)`
  grid-area: button;
  padding: 8px 16px;
  border-radius: 32px;
  height: 32px;
  background-color: ${props => props.theme.light};
  color: ${props => props.theme.dark}
  align-self: center;
  justify-self: center;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.18);
  border: none;
  &:hover {
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.18);
  }
`

const ButtonText = styled.p`
  font-size: 16px;
  color: #444;
`

// const ButtonImage = styled.img`
//   margin-right: 8px;
// `
