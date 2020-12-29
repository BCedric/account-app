import { accountActions } from '../accounts/Accounts-actions'
import { toastActions } from './toast-actions'

export function toastReducer(state = initialState, action) {
  if (action.type === toastActions.SET_MESSAGE) {
    const messages = [
      ...state.messages,
      { message: action.message, messageType: action.messageType }
    ]
    return { messages }
  }
  if (action.type === toastActions.DELETE_MESSAGE) {
    console.log('delete message', action)
    const messages = [...state.messages]
    const index =
      action.index != null ? accountActions.index : messages.length - 1
    messages.splice(index, 1)
    return { messages }
  }

  return state
}

const initialState = {
  messages: []
}
