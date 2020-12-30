import express from 'express'
import bodyParser from 'body-parser'
import setExpensesRouter from 'router/expense.mjs'
import usersRouter from 'router/user.mjs'
import authRouter from 'router/auth.mjs'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config()

const app = express()

const baseURL = process.env.BASE_URL

app.use(cors())

app.use(bodyParser.json())

app.use(`${baseURL}/expense`, setExpensesRouter(null))
app.use(`${baseURL}/user`, usersRouter)
app.use(`${baseURL}/auth`, authRouter)

app.use(express.static(`${baseURL}/${path.join(__dirname, 'client/build')}`))
app.get(baseURL, (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

app.get('/hello', function (req, res) {
  res.json('Hello World')
})

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
)

console.log(process.env)
