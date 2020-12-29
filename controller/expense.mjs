import Expense from 'entity/Expense.mjs'

const getExpenses = async (req, res) => {
  try {
    return res.json({
      expenses: await Expense.all()
    })
  } catch (err) {
    return res.json({
      err
    })
  }
}

const postExpense = async (req, res) => {
  const { userId, label, cost } = req.body
  try {
    const expense = new Expense()
    expense.setUserId(userId)
    expense.setLabel(label)
    expense.setCost(cost)
    return res.json({
      expense: await expense.save()
    })
    // updateUsers(io)
  } catch (err) {
    return res.json({
      err: `cannot add ${req.body.label}, ${err}`
    })
  }
}

const deleteExpense = async (req, res) => {
  const expenseId = req.params.expenseId
  try {
    const expense = new Expense()
    await expense.init(expenseId)
    expense.delete()
    // updateUsers(io)
    return res.json({
      msg: `supprimé avec succès`
    })
  } catch (err) {
    return res.json({
      err: `cannot delete expense ${expenseId}, ${err}`
    })
  }
}

const getExpensesTotal = async (req, res) => {
  try {
    return res.json({ total: await Expense.getExpensesTotal(userId) })
  } catch (err) {
    return res.json({
      err: `cannot get total, ${err}`
    })
  }
}

const getExpensesHistoric = async (req, res) => {
  try {
    return res.json({ expenses: await Expense.getExpensesHistoric() })
  } catch (err) {
    return res.json({
      err: 'cannot get historic'
    })
  }
}

export {
  getExpenses,
  postExpense,
  deleteExpense,
  getExpensesTotal,
  getExpensesHistoric
}
