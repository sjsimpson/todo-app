import { Schema, model } from 'mongoose'

export interface ITodo {
  description: string
  completed: boolean
}

const TodoSchema = new Schema<ITodo>({
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
})

export const Todo = model<ITodo>('Todo', TodoSchema)
