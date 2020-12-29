import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LocalStorageManager from '../common/LocalStorageManager'
import Login from './Login'

import { userConnectedSelector } from '../domain/auth/auth-selectors'
import { checkUser } from '../domain/auth/auth-actions'
import Home from './Home'

function Boot() {
  const userConnected = useSelector(userConnectedSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    const userFromLocalStorage = LocalStorageManager.get('user')
    if (userFromLocalStorage != null) {
      checkUser(userFromLocalStorage, dispatch)
    }
  }, [])

  return <div>{userConnected != null ? <Home /> : <Login />}</div>
}

export default Boot
