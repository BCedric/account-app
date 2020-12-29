import { authActions } from './auth-actions'

export function authReducer(state = initialState, action) {
  if (action.type === authActions.SET_USER_CONNECTED) {
    return { ...state, userConnected: action.user }
  }
  if (action.type === authActions.DISONNECT) {
    return { ...state, userConnected: null }
  }

  return state
}

const initialState = {
  userConnected: null
}
