import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import _ from 'lodash'

import todo from './routes/todos'

const app = express()
const serverPort = process.env.PORT || 3003
const clientPort = process.env.CLIENT_PORT || 3004

const appOrigin =
  process.env.NODE_ENV === 'dev'
    ? `http://localhost:${clientPort}`
    : 'https://api.whatever-the-actual-endpoint-is.com/'
const mongoDB = process.env.MONGO_URI || 'mongodb://mongo:27017/todo-app'

mongoose.set('strictQuery', false)
mongoose.connect(mongoDB)

export interface QueryPayload {
  payload: string
}

app.use(cors({ origin: appOrigin }))

app.get('/', (req: Request, res: Response) => {
  const responseData: QueryPayload = {
    payload: _.snakeCase('Server data returned successfully'),
  }

  res.json(responseData)
})

app.use('/todos', todo)

app.listen(serverPort, () => {
  console.log(`Example app listening at http://localhost:${serverPort}`)
})
