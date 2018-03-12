// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counter'
import themer from './themer'

const rootReducer = combineReducers({
  counter,
  router,
  themer,
})

export default rootReducer
