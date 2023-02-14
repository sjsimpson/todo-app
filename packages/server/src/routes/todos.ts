import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import {
  createTodo,
  getTodo,
  getTodos,
  deleteTodo,
  udpateTodo,
} from '../controllers/todosController'

const jsonParser = bodyParser.json()

const router = express.Router()

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const todos = await getTodos()
      res.send(todos)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  })
  .post(jsonParser, async (req: Request, res: Response) => {
    try {
      const todo = await createTodo(req.body)
      res.send(todo)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  })

router
  .route('/:id')
  .get(async (req: Request, res: Response) => {
    try {
      const todos = await getTodo(req.params.id)
      res.send(todos)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  })
  .put(jsonParser, async (req: Request, res: Response) => {
    try {
      const todo = await udpateTodo(req.params.id, req.body)
      res.send(todo)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await deleteTodo(req.params.id)
      res.status(201).send({ message: 'Successfully deleted.' })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  })

export default router
