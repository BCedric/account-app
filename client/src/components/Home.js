import React from 'react'
import { useSelector } from 'react-redux'

import Accounts from './Accounts/Accounts'
import { Route } from 'react-router-dom'

import ChangePasswordForm from './ChangePasswordForm'
import Menu from './Menu'
import History from './History'

// const clientPath = getEnvConst().clientPath

const Home = () => {
  return (
    <div>
      <div>
        <Menu />
        <Route exact path={`/`}>
          <Accounts />
        </Route>
        <Route path={`/changepassword`}>
          <ChangePasswordForm />
        </Route>
        <Route path={`/history`}>
          <History />
        </Route>
      </div>
    </div>
  )
}

export default Home
