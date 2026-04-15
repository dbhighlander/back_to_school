"use client"
import style from './TodoItem.module.css'
import { TodoItemProps } from './types'

const TodoItem = ({ todo, onEdit, onDelete, onToggle }: TodoItemProps) => {
  return (
    <div className={`${style.todoItem} ${todo.completed ? style.completed : ''}`}>
      {todo.completed ? (
        <span>{todo.text}</span>
      ) : (
        <input placeholder="Enter a task" type="text" value={todo.text} onChange={(e) => onEdit(todo.id, e.target.value)} />
      )
      }
      <input type='checkbox' className={style.toggleCompleted} checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <button onClick={() => onDelete(todo.id)}>x</button>
    </div>
  )
}

export default TodoItem
