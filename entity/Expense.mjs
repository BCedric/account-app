import DB from 'shared/db.mjs'

const expensesQueries = {
  userExpenses: 'SELECT * FROM expenses WHERE userId = $id',
  expenses: 'SELECT * FROM expenses WHERE isDeleted = false',
  addExpense:
    'INSERT INTO expenses (userId, label, cost) VALUES ($userId, $label, $cost)',
  resetExpenses: 'UPDATE expenses SET isDeleted = true',
  deleteExpense: 'DELETE FROM expenses WHERE id = $expenseId',
  expensesUserTotal:
    'SELECT SUM(cost) as total FROM expenses WHERE userId = $userId AND isDeleted = false',
  expensesTotal:
    'SELECT SUM(cost) as total FROM expenses WHERE isDeleted = false',
  history:
    'SELECT u.name, e.cost, e.date, e.label from expenses e INNER JOIN users u ON (u.id = e.userId) WHERE e.isDeleted = true ORDER BY e.date DESC'
}

class Expense {
  async init(id) {
    try {
      const expense = await DB.get(`SELECT * FROM expenses WHERE id =${id}`)
      const { userId, label, cost, isDeleted, date } = expense
      this.id = id
      this.userId = userId
      this.label = label
      this.cost = cost
      this.isDeleted = isDeleted
      this.date = date
      return this
    } catch (err) {
      throw err
    }
  }

  static all() {
    console.trace()
    try {
      return DB.all('SELECT * FROM expenses')
    } catch (err) {
      throw err
    }
  }

  static getExpensesTotal(userId = null) {
    if (userId != null) {
      return DB.get(expensesQueries.expensesUserTotal, {
        $userId: userId
      })
    } else {
      return DB.get(expensesQueries.expensesTotal)
    }
  }

  static getExpensesHistoric() {
    try {
      return DB.all(expensesQueries.history)
    } catch (error) {
      throw err
    }
  }

  async save() {
    try {
      const id = await DB.run(
        'INSERT INTO expenses (userId, label, cost) VALUES ($userId, $label, $cost)',
        {
          $userId: this.userId,
          $label: this.label,
          $cost: this.cost
        }
      )
      return DB.get(`SELECT * FROM expenses WHERE id =${id}`)
    } catch (err) {
      throw err
    }
  }

  delete() {
    try {
      return DB.run('DELETE FROM expenses WHERE id = $expenseId', {
        $expenseId: this.id
      })
    } catch (err) {
      throw err
    }
  }

  getUserId() {
    return this.userId
  }

  setUserId(userId) {
    this.userId = userId
    return this
  }

  getLabel() {
    return this.label
  }

  setLabel(label) {
    this.label = label
    return this
  }

  getCost() {
    return this.cost
  }

  setCost(cost) {
    this.cost = cost
    return this
  }

  getIsDeleted() {
    return this.isDeleted
  }

  setIsDeleted(isDeleted) {
    this.isDeleted = isDeleted
    return this
  }

  getDate() {
    return this.date
  }

  setDate(date) {
    this.date = date
    return this
  }
}

export default Expense
