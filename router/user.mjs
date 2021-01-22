import express from 'express'
import {
  getUsers,
  getUser,
  changePassword,
  putResetExpenses
} from 'controller/user.mjs'

const usersRouter = express.Router()

export const usersRoutes = {
  user: '/:userId',
  reset: '/reset'
}

usersRouter
  .get('', getUsers)
  .get(usersRoutes.user, getUser)
  .put('/:userId/changepassword', changePassword)
  .put(usersRoutes.reset, putResetExpenses)

export default usersRouter
