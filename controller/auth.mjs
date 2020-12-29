import DB from 'shared/db.mjs'
import { generatePassword } from 'shared/generate-password.mjs'
import { generateAuthToken } from 'shared/generate-aut-token.mjs'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const auth = async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await DB.get(`SELECT * from users WHERE name = '${name}'`)

    if (user == null) {
      throw "L'utilisateur n'existe pas"
    }
    await bcrypt.compare(password, user.password).then((auth) => {
      if (!auth) {
        throw `le mot de passe ne correspond pas`
      }
      return auth
    })

    const newToken = generateAuthToken(user)
    await DB.run(
      `UPDATE users SET token = '${newToken}' WHERE id = ${user.id};`
    )
    user.token = newToken

    const upuser = await DB.get(`SELECT * from users WHERE name = '${name}'`)
    delete user.password
    res.json({ user })
  } catch (err) {
    res.json({ err })
  }
}

const passwordGen = async (req, res) => {
  try {
    const { password } = req.body
    const encryptedPassword = await generatePassword(password)
    console.log(encryptedPassword)
    return res.json({ encrypted: encryptedPassword })
  } catch (err) {
    res.json({ err })
  }
}

const checkAuth = async (req, res) => {
  const user = req.body
  try {
    const userFromDB = await DB.get(`SELECT * from users WHERE id = ${user.id}`)
    if (userFromDB == null) {
      res.json({ connected: false })
    } else {
      jwt.verify(user.token, process.env.ACCESS_TOKEN_SECRET)
      const newToken = generateAuthToken(user)
      await DB.run(
        `UPDATE users SET token = '${newToken}' WHERE id = ${user.id};`
      )
      user.token = newToken
      res.json({ user })
    }
  } catch (err) {
    res.json({ connected: false })
  }
}

export { auth, passwordGen, checkAuth }
