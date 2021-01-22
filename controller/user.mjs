import User from 'entity/User.mjs'

const getUsers = async (req, res) => {
  try {
    return res.json({
      users: await User.all()
    })
  } catch (err) {
    return res.json({
      err
    })
  }
}

const getUser = async (req, res) => {
  const userId = req.params.userId
  const user = new User()
  try {
    return res.json({
      user: await user.init(userId)
    })
  } catch (err) {
    return res.json({
      err
    })
  }
}

const changePassword = async (req, res) => {
  const id = req.params.userId
  const { currentPassword, newPassword, newPasswordConfirmation } = req.body

  try {
    if (newPassword != newPasswordConfirmation) {
      throw 'les mots de passe doivent être identiques'
    }
    const user = new User()
    await user.init(id)
    await user.changePassword(currentPassword, newPassword)
    res.json({ msg: 'mot de passe mis à jour avec succès' })
  } catch (err) {
    res.json({ err })
  }
}

const putResetExpenses = async (req, res) => {
  try {
    await User.resetAll()
    return res.json({ users: await User.all() })
  } catch (err) {
    return res.json({
      err: 'cannot reset'
    })
  }
}

export { getUsers, getUser, changePassword, putResetExpenses }
