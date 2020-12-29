export const accountsAPI = {
    users: () => '/users',
    userExpenses: () => `/expenses`,
    reset: () => '/expenses/reset',
    expense: (expenseId) => `/expenses/${expenseId}`,
    expensesTotal: () => '/expenses/total',
    history: () => '/expenses/history'
}