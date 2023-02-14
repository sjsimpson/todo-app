import { TodoItem } from '../types'

const getTodoItems = async (): Promise<TodoItem[]> => {
  const items = await fetch('http://localhost:3003/todos', {
    method: 'GET',
  })

  return items.json()
}

const insertTodoItem = async (todoItem: TodoItem): Promise<TodoItem> => {
  const item = await fetch('http://localhost:3003/todos', {
    method: 'POST',
    body: JSON.stringify(todoItem),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return item.json()
}

const updateTodoItem = async (todoItem: TodoItem): Promise<TodoItem> => {
  const item = await fetch(`http://localhost:3003/todos/${todoItem._id}`, {
    method: 'PUT',
    body: JSON.stringify(todoItem),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return item.json()
}

const deleteTodoItem = async (id: string): Promise<TodoItem> => {
  const item = await fetch(`http://localhost:3003/todos/${id}`, {
    method: 'DELETE',
  })

  return item.json()
}

export default { getTodoItems, insertTodoItem, updateTodoItem, deleteTodoItem }
