import { accountActions } from './Accounts-actions'

export function accountReducer(state = initialState, action) {
  if (action.type === accountActions.SET_USERS) {
    return { ...state, users: action.users }
  }
  if (action.type === accountActions.ADD_EXPENSE) {
    const userIndex = state.users.findIndex((user) => user.id === action.userId)
    const user = { ...state.users[userIndex] }
    user.expenses.push(action.expense)
    user.total += action.expense.cost
    return {
      ...state,
      users: Array.from(state.users, (u) => (u.id === user.id ? user : u))
    }
  }
  if (action.type === accountActions.REMOVE_EXPENSE) {
    const userIndex = state.users.findIndex((user) => user.id === action.userId)
    const user = { ...state.users[userIndex] }
    const expenseIndex = user.expenses.findIndex(
      (e) => e.id === action.expenseId
    )
    const expense = user.expenses[expenseIndex]
    user.expenses.splice(expenseIndex, 1)
    user.total -= expense.cost

    return {
      ...state,
      users: Array.from(state.users, (u) => (u.id === user.id ? user : u))
    }
  }

  if (action.type === accountActions.RESET_EXPENSES) {
    return { ...state, users: action.users }
  }
  return state
}

const initialState = {
  users: [],
  msgs: []
}
