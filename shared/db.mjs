import sqlite3 from 'sqlite3'
import { resolve } from 'dns'

const db = new sqlite3.Database('count-database.sqlite')

class DB {
  static get(query, params) {
    return new Promise((resolve, reject) => {
      db.get(query, params, (err, entity) => {
        err == null ? resolve(entity) : reject(err)
      })
    })
  }

  static all(query, params) {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, entities) => {
        err == null ? resolve(entities) : reject(err)
      })
    })
  }

  static run(query, params) {
    return new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        err != null ? reject(err) : resolve(this.lastID)
      })
    })
  }
}

export default DB
