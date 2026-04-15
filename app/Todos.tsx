"use client"
import style from './Todos.module.css'
import TodoItem from "./TodoItem"
import useTodos from "./useTodos"
import { TodoProps } from './types'

const Todos = ({ initialTodos }: TodoProps) => {

  const { todos, deleteTodo, editTodo, toggleComplete, addTodo } = useTodos(initialTodos);

  return (
    <div className={style.todoList}>
      {todos.map((todo, i) => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onEdit={editTodo} onToggle={toggleComplete} />
      ))}
      <div className={style.todoFooter}>
        <button className={style.button} onClick={() => addTodo("")} >Create</button>
      </div>
    </div>
  )

}

export default Todos