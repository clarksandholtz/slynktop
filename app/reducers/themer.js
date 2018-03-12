// @flow
import { CHANGE_THEME, RESET_THEME } from '../actions/themer'

export type themerStateType = {
  +themeName: string,
}

export type themerActionType = {
  +type: string,
  +themeName: string,
}

export default function counter(
  state: string = 'default',
  action: themeActionType,
) {
  switch (action.type) {
    case CHANGE_THEME:
      return (state = action.themeName)
    case RESET_THEME:
      return (state = 'default')
    default:
      return state
  }
}
