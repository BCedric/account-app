import Http from '../../common/Http'
import { accountsApi, userApi } from '../../constants/api-const'

export const accountActions = {
  SET_USERS: 'SET_USERS',
  ADD_EXPENSE: 'ADD_EXPENSE',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
  RESET_EXPENSES: 'RESET_EXPENSES'
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

export const resetExpenses = (users) => ({
  type: accountActions.RESET_EXPENSES,
  users
})

export const setUsers = (users) => ({ type: accountActions.SET_USERS, users })

export const getUsers = (dispatch) =>
  Http.get(userApi.users()).then((data) => dispatch(setUsers(data.users)))

export const postExpense = (userId, data, dispatch) =>
  Http.post(accountsApi.expenses(), { userId, ...data }).then((res) =>
    dispatch(addExpense(userId, res.expense))
  )

export const deleteExpense = (expenseId, userId, dispatch) =>
  Http.delete(accountsApi.expense(expenseId)).then((_) =>
    dispatch(removeExpense(expenseId, userId))
  )

export const putResetExpenses = (dispatch) =>
  Http.put(userApi.reset()).then((res) => dispatch(resetExpenses(res.users)))
