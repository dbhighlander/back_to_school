"use client"
import { useState } from "react"
import Todo from "./types"
import style from './Todos.module.css'

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: Date.now() + Math.random(),
      text: "Go shopping",
      completed: false
    },
    {
      id: Date.now() + Math.random(),
      text: "Feed dog... always...",
      completed: false
    },
  ]);

  const addTodo = (text: string) => {
    const todo: Todo = {
      id: Date.now(),
      text: text,
      completed: false
    }

    setTodos(prev => [...prev, todo]);
  }

  const editTodo = (id: number, text: string) => {

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ?
          { ...todo, text }
          : todo
      )
    );
  }

  const toggleComplete = (id: number): void => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  const deleteTodo = (id: number) => {
    if (!window.confirm("Do you wish to delete this todo?")) return;
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  return (
    <div className={style.todoList}>
      {todos.map((todo, i) => (
        <div key={"todo-" + i} className={`${style.todoItem} ${todo.completed ? style.completed : ''}`}>
          {todo.completed ? (
            <span>{todo.text}</span>
          ) : (
            <input placeholder="Enter a task" type="text" value={todo.text} onChange={(e) => editTodo(todo.id, e.target.value)} />
          )
          }
          <input type='checkbox' className={style.toggleCompleted} checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
          <button onClick={() => deleteTodo(todo.id)}>x</button>
        </div>
      ))}
      <div className={style.todoFooter}>
        <button className={style.button} onClick={()=> addTodo("")} >Create</button>
      </div>
    </div>
  )

}

export default Todos