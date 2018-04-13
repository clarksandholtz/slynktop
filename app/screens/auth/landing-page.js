import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { graphql, withApollo } from 'react-apollo'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import googleSignIn, { KEY_TOKEN } from '../../modules/auth'
import googleImg from '../../assets/img/Bitmap.png'

class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false,
      uid: '',
      email: '',
      phone: '',
      fullName: '',
    }
  }

  handleAuthClick = async () => {
    this.setState({ loading: true })
    const googleUser = await googleSignIn()
    this.setState({ loading: false })
    const { login, toggleAuth } = this.props
    const { email, uid, displayName: fullName } = googleUser
    console.log('UID!!!!', uid)
    const res = await login(email, uid).catch(err => {
      console.error(err.message)
      if (err.message.includes('No such user found for email')) {
        this.setState({ createAccount: true, email, uid, fullName })
      } else {
        alert('Oops! Something went wrong logging you in!')
      }
    })
    if (this.state.createAccount) return
    if (res.data && res.data.login && res.data.login.token) {
      localStorage.setItem(KEY_TOKEN, res.data.login.token)
      toggleAuth()
    } else {
      alert('No token found! Uh oh!')
    }
  }

  handleFullNameChange = ({ target: { value: fullName } }) => {
    this.setState({ fullName })
  }

  handlePhoneChange = ({ target: { value: phone } }) => {
    this.setState({ phone })
  }

  handleSignup = async e => {
    e.preventDefault()

    const { signup, toggleAuth } = this.props
    const { fullName, email, phone, uid } = this.state
    const res = await signup(fullName, email, phone, uid).catch(err => {
      console.error(err)
      alert('Oops! Signup failed!')
    })
    if (res.data && res.data.signup && res.data.signup.token) {
      localStorage.setItem(KEY_TOKEN, res.data.signup.token)
      toggleAuth()
    } else {
      alert('No token found! Uh oh!')
    }
  }

  render() {
    const { createAccount, fullName, email, phone } = this.state
    const validInputs = fullName && email && phone
    return createAccount ? (
      <SignupForm onSubmit={this.handleSignup}>
        <RoundInput
          placeholder="full name"
          value={fullName}
          empty={!fullName}
          onChange={this.handleFullNameChange}
        />
        <RoundInput
          placeholder="phone"
          value={phone}
          empty={!phone}
          onChange={this.handlePhoneChange}
        />
        <RoundInput disabled placeholder="email" value={email} />
        <RoundInput
          disabled={!validInputs}
          type="submit"
          value="Let's go!"
          empty={false}
        />
      </SignupForm>
    ) : (
      <Container>
        <LogoContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 50 34"
          >
            <g fill="#FFF" fillRule="evenodd">
              <rect width="18" height="2" y="32" rx="1" />
              <rect width="18" height="2" y="28" rx="1" />
              <rect width="18" height="2" y="24" rx="1" />
              <rect
                width="18"
                height="2"
                y="18"
                rx="1"
                transform="rotate(18 9 19)"
              />
              <rect
                width="18"
                height="2"
                x="5"
                y="11"
                rx="1"
                transform="rotate(52 14 12)"
              />
              <rect
                width="18"
                height="2"
                x="13"
                y="8"
                rx="1"
                transform="rotate(90 22 9)"
              />
              <rect
                width="18"
                height="2"
                x="32"
                y="32"
                rx="1"
                transform="matrix(-1 0 0 1 82 0)"
              />
              <rect
                width="18"
                height="2"
                x="32"
                y="28"
                rx="1"
                transform="matrix(-1 0 0 1 82 0)"
              />
              <rect
                width="18"
                height="2"
                x="32"
                y="24"
                rx="1"
                transform="matrix(-1 0 0 1 82 0)"
              />
              <rect
                width="18"
                height="2"
                x="32"
                y="18"
                rx="1"
                transform="scale(-1 1) rotate(18 0 -239.864)"
              />
              <rect
                width="18"
                height="2"
                x="27"
                y="11"
                rx="1"
                transform="scale(-1 1) rotate(52 0 -61.81)"
              />
              <rect
                width="18"
                height="2"
                x="19"
                y="8"
                rx="1"
                transform="matrix(0 1 1 0 19 -19)"
              />
            </g>
          </svg>
        </LogoContainer>
        <AuthButton onClick={this.handleAuthClick}>
          <GoogleImg src={googleImg} />
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

const AuthButton = styled.div`
  grid-area: button;
  padding: 8px 12px;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const GoogleImg = styled.img`
  padding-right: 8px;
`

const ButtonText = styled.p`
  font-size: 16px;
  color: #444;
`

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.primary};
`

const RoundInput = styled.input`
  border-radius: 16px;
  padding: 8px 16px;
  border: ${({ empty, theme }) =>
    empty ? `1px solid ${theme.light}` : 'none'};
  background-color: ${({ empty, theme }) =>
    empty ? 'transparent' : theme.light};
  color: ${({ theme }) => theme.dark};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.18);
  width: 80%;
  max-width: 500px;
  margin: 16px;
  &:disabled {
    color: ${({ theme }) => theme.medium};
  }
  &::placeholder {
    color: ${({ theme }) => theme.light};
  }
`

// const ButtonImage = styled.img`
//   margin-right: 8px;
// `

const createLoginMutation = gql`
  mutation login($email: String!, $uid: String!) {
    login(email: $email, uid: $uid) {
      user {
        id
        email
        phone
        syncComplete
      }
      token
    }
  }
`

const createSignUpMutation = gql`
  mutation signup(
    $name: String!
    $email: String!
    $phone: String!
    $uid: String!
  ) {
    signup(name: $name, email: $email, phone: $phone, uid: $uid) {
      user {
        id
        email
        phone
        syncComplete
      }
      token
    }
  }
`

const withMutations = compose(
  graphql(createLoginMutation, {
    props: ({ ownProps, mutate }) => ({
      login: (email, uid) => {
        return mutate({
          variables: { email: email, uid: uid },
        })
      },
    }),
  }),
  graphql(createSignUpMutation, {
    props: ({ ownProps, mutate }) => ({
      signup: (name, email, phone, uid) => {
        return mutate({
          variables: { name: name, email: email, phone: phone, uid: uid },
        })
      },
    }),
  }),
)

export default withApollo(withMutations(Landing))
