"use client"
import { memo, useState } from 'react'
import style from './TodoItem.module.css'
import { TodoItemProps } from '@/features/todos/types'

const TodoItem = ({ todo, onEdit, onDelete, onToggle }: TodoItemProps) => {

  const [draft, setDraft] = useState(todo.text);

  return (
    <div className={`${style.todoItem} ${todo.completed ? style.completed : ''}`}>
      {todo.completed ? (
        <span>{todo.text}</span>
      ) : (
        <input placeholder="Enter a task" type="text" value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={() => onEdit(todo.id, draft)} />
      )
      }
      <input type='checkbox' className={style.toggleCompleted} checked={todo.completed} onChange={() => onToggle(todo)} />
      <button onClick={() => onDelete(todo.id)}>x</button>
    </div>
  )
}

export default memo(TodoItem);
