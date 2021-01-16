import bcrypt from 'bcrypt'

const hashPassword = async (password) => await bcrypt.hash(password, 10)

const genSalt = (saltRounds) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, async (err, salt) => {
      if (err) {
        reject(err)
      }
      resolve(salt)
    })
  })

export const generatePassword = async (password) => {
  const saltRounds = 10
  const salt = await genSalt(saltRounds)
  return await hashPassword(password, salt)
}
