import Http from '../../common/Http'
import LocalStorageManager from '../../common/LocalStorageManager'

import { authApi, userApi } from '../../constants/api-const'

export const authActions = {
  SET_USER_CONNECTED: 'SET_USER_CONNECTED',
  DISONNECT: 'DISONNECT'
}

export const setUserConnected = (user) => ({
  type: authActions.SET_USER_CONNECTED,
  user
})

export const disconnect = () => ({
  type: authActions.DISONNECT
})

export const logUser = (credentials, dispatch) =>
  Http.put(authApi.auth(), credentials).then((data) => {
    if (data.user != null) {
      const { user } = data
      LocalStorageManager.set('user', user)
      dispatch(setUserConnected(user))
    }
    return data
  })

export const checkUser = (user, dispatch) => {
  Http.put(authApi.authCheckAuth(), user).then((res) => {
    if (res.user != null) {
      dispatch(setUserConnected(res.user))
    }
  })
}

export const logout = (dispatch) => {
  LocalStorageManager.remove('user')
  dispatch(disconnect())
}

export const changePassword = (userId, data) =>
  Http.put(userApi.changePassword(userId), data)
