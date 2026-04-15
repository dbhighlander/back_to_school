import style from './TodoFooter.module.css'
import { TodoFooterProps } from './types'

export const TodoFooter = ({ onAdd }: TodoFooterProps) => {

  return (
    <div className={style.todoFooter}>
      <button className={style.button} onClick={() => onAdd('')} >Create</button>
    </div>
  )
}