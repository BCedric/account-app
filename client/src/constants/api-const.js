export const authApi = {
  auth: () => '/auth',
  authGenPassword: () => '/auth/genpassword',
  authCheckAuth: () => '/auth/checkAuth'
}

export const accountsApi = {
  expenses: () => '/expense',
  expense: (expenseId) => `/expense/${expenseId}`,
  history: () => '/expense/history'
}

export const userApi = {
  changePassword: (userId) => `/user/${userId}/changepassword`
}

export const usersApi = {
  users: () => '/user'
}
