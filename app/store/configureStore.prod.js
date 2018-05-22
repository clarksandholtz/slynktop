// @flow
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import type { counterStateType } from '../reducers/counter'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const history = createBrowserHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)

function configureStore(initialState?: counterStateType) {
  const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  return createStore(persistedReducer, initialState, enhancer)
}

export default { configureStore, history }
