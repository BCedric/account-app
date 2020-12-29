import jwt from 'jsonwebtoken'

export const generateAuthToken = (user) => {
  const token = jwt.sign({ _id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE),
    algorithm: 'HS256'
  })
  return token
}
