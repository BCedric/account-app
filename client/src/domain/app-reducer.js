import { combineReducers } from 'redux'

import { accountReducer } from './accounts/Accounts-reducer'
import { authReducer } from './auth/auth-reducer'
import { toastReducer } from './toast/toast-reducer'

const appReducer = combineReducers({
  accounts: accountReducer,
  auth: authReducer,
  toast: toastReducer
})

export default appReducer
