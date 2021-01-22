import bcrypt from 'bcrypt'

import DB from 'shared/db.mjs'
import { generatePassword } from 'shared/generate-password.mjs'

export const usersQueries = {
  users: 'SELECT * from users',
  userById: 'SELECT * from users WHERE id = $id',
  userByName: 'SELECT * from users WHERE name = $name',
  usersWithexpenses:
    'SELECT u.id as id, u.name, u.password, e.label, e.cost, e.date, e.id as expenseId from users u INNER JOIN expenses e ON (u.id = e.userId) WHERE e.isDeleted = false',
  updateUserToken: 'UPDATE users SET token = $token WHERE id = $id',
  updateUserPassword: 'UPDATE users SET password = $password WHERE id = $id',
  userExpenses: 'SELECT * FROM expenses WHERE userId = $id'
}

export default class User {
  async init(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await DB.get(usersQueries.userById, { $id: id })
        this.id = id
        this.name = user.name
        this.password = user.password
        this.expenses = await this.getExpenses(id)
        this.total = this.expenses.reduce(
          (previous, expense) => expense.cost + previous,
          0
        )
        resolve(this)
      } catch (err) {
        reject(err)
      }
    })
  }

  static async all() {
    try {
      const users = await DB.all(usersQueries.users)
      return Promise.all(users.map((user) => new User().init(user.id)))
    } catch (error) {
      throw error
    }
  }

  static async resetAll() {
    try {
      return DB.all('UPDATE expenses SET isDeleted = true')
    } catch (error) {
      throw err
    }
  }

  async getExpenses(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const expenses = await DB.all(
          `SELECT * from expenses WHERE userId = ${id} AND isDeleted = 0`
        )
        resolve(expenses)
      } catch (err) {
        reject(err)
      }
    })
  }

  async changePassword(currentPassword, newPassword) {
    return new Promise(async (resolve, reject) => {
      try {
        await bcrypt.compare(currentPassword, this.password).then((bool) => {
          if (!bool) {
            throw 'le mot passe courant ne correspond pas'
          }
          return bool
        })
        const password = await generatePassword(newPassword)
        await DB.run(usersQueries.updateUserPassword, {
          $id: this.id,
          $password: password
        })
        resolve(null)
      } catch (err) {
        reject(err)
      }
    })
  }

  getName() {
    return this.name
  }

  setName(name) {
    this.name = name
    return this
  }

  getPassword() {
    return this.password
  }

  setPassword(password) {
    this.password = password
    return this
  }

  getToken() {
    return this.token
  }

  setToken(token) {
    this.token = token
    return this
  }
}
