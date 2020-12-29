import express from 'express'
import { getUsers, getUser, changePassword } from 'controller/user.mjs'

const usersRouter = express.Router()

export const usersRoutes = {
  user: '/:userId'
}

usersRouter
  .get('', getUsers)
  .get(usersRoutes.user, getUser)
  .put('/:userId/changepassword', changePassword)

export default usersRouter
