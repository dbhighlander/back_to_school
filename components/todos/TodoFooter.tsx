"use client"
import style from './TodoFooter.module.css'
import { TodoFooterProps } from '@/features/todos/types'

const TodoFooter = ({ onAdd }: TodoFooterProps) => {

  return (
    <div className={style.todoFooter}>
      <button className={style.button} onClick={() => onAdd('')} >Create</button>
    </div>
  )
}

export default TodoFooter