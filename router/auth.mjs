import express from 'express'
import { auth, passwordGen, checkAuth } from 'controller/auth.mjs'

const authRouter = express.Router()

authRouter
  .put('', auth)
  .put('/genpassword', passwordGen)
  .put('/checkAuth', checkAuth)

export default authRouter
