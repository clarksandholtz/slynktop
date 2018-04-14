import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './Root'
import { configureStore, history } from './store/configureStore'
import './app.global.css'
import { persistStore } from 'redux-persist'

const store = configureStore()
const persistor = persistStore(store)

render(
  <AppContainer>
    <Root store={store} history={history} persistor={persistor} />
  </AppContainer>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} persistor={persistor} />
      </AppContainer>,
      document.getElementById('root'),
    )
  })
}
