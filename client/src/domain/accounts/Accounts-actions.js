import Http from '../../common/Http'
import { accountsApi, usersApi } from '../../constants/api-const'

export const accountActions = {
  SET_USERS: 'SET_USERS',
  ADD_EXPENSE: 'ADD_EXPENSE',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE'
}

export const addExpense = (userId, expense) => ({
  type: accountActions.ADD_EXPENSE,
  userId,
  expense
})

export const removeExpense = (expenseId, userId) => ({
  type: accountActions.REMOVE_EXPENSE,
  expenseId,
  userId
})

export const setUsers = (users) => ({ type: accountActions.SET_USERS, users })

export const getUsers = (dispatch) =>
  Http.get(usersApi.users()).then((data) => dispatch(setUsers(data.users)))

export const postExpense = (userId, data, dispatch) =>
  Http.post(accountsApi.expenses(), { userId, ...data }).then((res) =>
    dispatch(addExpense(userId, res.expense))
  )

export const deleteExpense = (expenseId, userId, dispatch) =>
  Http.delete(accountsApi.expense(expenseId)).then((_) =>
    dispatch(removeExpense(expenseId, userId))
  )
