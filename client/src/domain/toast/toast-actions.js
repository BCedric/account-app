export const toastActions = {
  SET_MESSAGE: 'SET_MESSAGE',
  DELETE_MESSAGE: 'DELETE_MESSAGE'
}

export const setMessage = (message, messageType) => ({
  type: toastActions.SET_MESSAGE,
  message,
  messageType
})

export const deleteMessage = (index) => ({
  type: toastActions.DELETE_MESSAGE,
  index
})
