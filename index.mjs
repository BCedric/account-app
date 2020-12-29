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

app.use(cors())

app.use(bodyParser.json())

app.use('/expense', setExpensesRouter(null))
app.use('/user', usersRouter)
app.use('/auth', authRouter)

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

app.get('/hello', function (req, res) {
  res.json('Hello World')
})

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
)
