"use client"
import style from './Todos.module.css'
import TodoItem from "./TodoItem"
import useTodos from "./useTodos"
import { TodoProps } from './types'
import { TodoFooter } from './TodoFooter'

const Todos = ({ initialTodos }: TodoProps) => {

  const { todos, deleteTodo, editTodo, toggleComplete, addTodo } = useTodos(initialTodos);

  return (
    <div className={style.todoList}>
      {todos.map((todo, i) => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onEdit={editTodo} onToggle={toggleComplete} />
      ))}
      <TodoFooter onAdd={addTodo} />
    </div>
  )

}

export default Todos