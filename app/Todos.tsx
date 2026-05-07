"use client"
import style from './Todos.module.css'
import TodoItem from '@/components/todos/TodoItem'
import useTodos from "../features/todos/useTodos"
import TodoFooter from '@/components/todos/TodoFooter'

const Todos = () => {

  const { todos, addTodo, deleteTodo, editTodo, toggleComplete } = useTodos();
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