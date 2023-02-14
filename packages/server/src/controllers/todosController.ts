import { Todo, ITodo } from '../models/todos'

const createTodo = async (todo: ITodo) => {
  console.log('Adding todo to database:', todo)
  const createdTodo = await Todo.create(todo)
  return createdTodo
}

const getTodo = async (id: string) => {
  console.log('Checking for todo by id:', id)
  const todo = await Todo.findById(id)
  return todo
}

const udpateTodo = async (id: string, todo: ITodo) => {
  console.log('Updating todo:', id, todo)
  const updatedTodo = await Todo.findByIdAndUpdate(id, {
    description: todo.description,
    completed: todo.completed,
  })

  return updatedTodo
}

const getTodos = async () => {
  console.log('Getting all todos')
  const todo = await Todo.find()
  return todo
}

const deleteTodo = async (id: string) => {
  console.log('Deleting todo:', id)
  const deletedResult = await Todo.findByIdAndDelete(id)

  return deletedResult
}

export { createTodo, getTodo, getTodos, deleteTodo, udpateTodo }
