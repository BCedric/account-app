import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import AccountExpense from './AccountExpense'
import { userConnectedSelector } from '../../domain/auth/auth-selectors'
import AccountsForm from './AccountsForm'

const AccountUser = ({ user }) => {
  const userConnected = useSelector(userConnectedSelector)
  const { expenses, id, name } = user
  const isUserConnected = id === userConnected.id

  return (
    <div className="user-container">
      <ListGroup className="expenses">
        <h1>{name}</h1>
        {expenses.length > 0 &&
          expenses.map((expense) => (
            <ListGroup.Item key={expense.id}>
              <AccountExpense expense={expense} isConnected={isUserConnected} />
            </ListGroup.Item>
          ))}
        {expenses.length === 0 && <span>Aucune dépense</span>}
      </ListGroup>
      <span className="user-total">Total: {user.total}</span>
      {isUserConnected && <AccountsForm userId={id} />}
    </div>
  )
}

export default AccountUser
