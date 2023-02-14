import './styles/App.scss'

import { useState, useEffect } from 'react'

import todosApi from './api/todos'
import { TodoItem } from './types'

import { Todo } from './components/Todo'

export const App = () => {
  const [todo, setTodo] = useState<TodoItem>({
    description: '',
    completed: false,
  })
  const [todos, setTodos] = useState<TodoItem[]>([])

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const createdTodo = await todosApi.insertTodoItem(todo)
    setTodos([...todos, createdTodo])
  }

  const onDelete = async (id: string) => {
    await todosApi.deleteTodoItem(id)

    const newTodos = todos.filter((item) => item._id !== id)
    setTodos(newTodos)
  }

  useEffect(() => {
    todosApi.getTodoItems().then((items: TodoItem[]) => {
      if (items) {
        setTodos(items)
      }
    })
  }, [])

  return (
    <div className="app-content">
      <div className="header">TO-DO List</div>
      <div className="add-item-section">
        <form action=".">
          <input
            className="item-input"
            type="text"
            placeholder="To-do item text..."
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
          <button className="add-item" type="submit" onClick={handleSubmit}>
            Add To-do
          </button>
        </form>
      </div>
      <ul className="item-list">
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  )
}
