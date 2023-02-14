import './Todo.scss'

import { TodoItem } from '../types'
import { useState } from 'react'

import todosApi from '../api/todos'

export const Todo = ({
  todo,
  onDelete,
}: {
  todo: TodoItem
  onDelete: Function
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(todo.completed)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [description, setDescription] = useState<string>(todo.description)

  const handleDelete = async (event: any) => {
    event.preventDefault()
    await onDelete(todo._id)
  }

  const handleCheck = async (event: any) => {
    event.preventDefault()

    await todosApi.updateTodoItem({ ...todo, completed: !isChecked })
    setIsChecked(!isChecked)
  }

  const handleSaveDescription = async (event: any) => {
    event.preventDefault()

    await todosApi.updateTodoItem({
      ...todo,
      description,
      completed: isChecked,
    })
    setIsEditing(false)
  }

  const editor = (
    <>
      <input
        className="description-editor"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="save-button" onClick={handleSaveDescription}>
        SAVE
      </button>
    </>
  )

  const staticDisplay = (
    <>
      <div
        className="description"
        style={isChecked ? { textDecoration: 'line-through' } : {}}
      >
        {description}
      </div>
      <div className="edit-item-button" onClick={() => setIsEditing(true)}>
        <span className="material-symbols-outlined">edit</span>
      </div>
    </>
  )

  return (
    <li className={'todo-item'}>
      <div className="todo-contents">
        <div className="checkmark-container" onClick={handleCheck}>
          {isChecked && (
            <span className="checkmark material-symbols-outlined">check</span>
          )}
        </div>
        {isEditing ? editor : staticDisplay}
      </div>
      <div className="delete-item-button" onClick={handleDelete}>
        <span className="material-symbols-outlined">delete</span>
      </div>
    </li>
  )
}
