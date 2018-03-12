// @flow
import * as React from 'react'
import styled from 'styled-components'
import * as firebase from 'firebase'

type Props = {
  children: React.Node,
}

export default class App extends React.Component<Props> {
  props: Props

  componentDidMount() {
    var config = {
      apiKey: 'AIzaSyBYK1VWzPhyC93Ow3QXGoPw_tftcB8E8M8',
      authDomain: 'slyncy-c0f11.firebaseapp.com',
      databaseURL: 'https://slyncy-c0f11.firebaseio.com',
      projectId: 'slyncy-c0f11',
      storageBucket: 'slyncy-c0f11.appspot.com',
      messagingSenderId: '598493394141',
    }
    firebase.initializeApp(config)
  }

  render() {
    return <AppContainer>{this.props.children}</AppContainer>
  }
}

const AppContainer = styled.div`
  height: 100%;
`
