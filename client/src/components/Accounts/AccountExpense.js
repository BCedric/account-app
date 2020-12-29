import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import Trash from '../../Icons/Trash'

import { deleteExpense } from '../../domain/accounts/Accounts-actions'
import { userConnectedSelector } from '../../domain/auth/auth-selectors'
import { setMessage } from '../../domain/toast/toast-actions'

const AccountExpense = ({ expense, isConnected }) => {
  const dispatch = useDispatch()
  const userConnected = useSelector(userConnectedSelector)

  const { date, label, cost, id } = expense

  const onDelete = () => {
    deleteExpense(id, userConnected.id, dispatch).then((data) =>
      dispatch(setMessage('Suppression avec succès', 'success'))
    )
  }
  return (
    <div className="expense-container">
      <div className="expense-infos">
        <span className="expense-date">{moment(date).format('D MMMM')}</span>
        <span>
          <span className="expense-label">{label}</span> :{' '}
          <span className="expense-cost">{cost}</span>
        </span>
      </div>
      {isConnected && (
        <div className="trash-container">
          <Trash width={20} onClick={(event) => onDelete(event)} />
        </div>
      )}
    </div>
  )
}

export default AccountExpense
