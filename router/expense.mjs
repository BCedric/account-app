import express from 'express'

import {
  getExpenses,
  postExpense,
  deleteExpense,
  getExpensesTotal,
  getExpensesHistoric
} from 'controller/expense.mjs'

const expensesRoutes = {
  expenses: '',
  resetExpenses: '/reset',
  expense: '/:expenseId',
  expensesTotal: '/total',
  history: '/history'
}

const expensesRouter = express.Router()

const setExpensesRouter = (io) =>
  expensesRouter
    .get(expensesRoutes.expenses, getExpenses)
    .post(expensesRoutes.expenses, postExpense)
    .delete(expensesRoutes.expense, deleteExpense)
    .get(expensesRoutes.expensesTotal, getExpensesTotal)
    .get(expensesRoutes.history, getExpensesHistoric)

export default setExpensesRouter
