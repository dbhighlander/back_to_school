"use client"
import { useState } from "react"
import {Todo} from "./types"
import style from './Todos.module.css'
import TodoItem from "./TodoItem"

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: crypto.randomUUID(),
      text: "Go shopping",
      completed: false
    },
    {
      id: crypto.randomUUID(),
      text: "Feed dog... always...",
      completed: false
    },
  ]);

  const addTodo = (text: string) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      completed: false
    }

    setTodos(prev => [...prev, todo]);
  }

  const editTodo = (id: string, text: string) => {

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ?
          { ...todo, text }
          : todo
      )
    );
  }

  const toggleComplete = (id: string): void => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  const deleteTodo = (id: string) => {
    if (!window.confirm("Do you wish to delete this todo?")) return;
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  return (
    <div className={style.todoList}>
      {todos.map((todo, i) => (
        <TodoItem key={'todo-'+i} todo={todo} onDelete={deleteTodo} onEdit={editTodo} onToggle={toggleComplete} />
      ))}
      <div className={style.todoFooter}>
        <button className={style.button} onClick={()=> addTodo("")} >Create</button>
      </div>
    </div>
  )

}

export default Todos