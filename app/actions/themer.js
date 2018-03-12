// @flow
import type { themerStateType, themerActionType } from '../reducers/themer'

export const CHANGE_THEME = 'CHANGE_THEME'
export const RESET_THEME = 'RESET_THEME'

export function changeTheme(themeName: string) {
  return {
    type: CHANGE_THEME,
    themeName,
  }
}

export function resetTheme() {
  return {
    type: RESET_THEME,
  }
}
