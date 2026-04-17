"use client"
import todosReducer from "./todosReducer";
import { Todo } from "./types";
import { useReducer } from "react";

const useTodos = (initialTodos: Todo[]) => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos)

  const addTodo = (text: string) => {
    dispatch({ type: "add", payload: text });
  }

  const editTodo = (id: string, text: string) => {
    dispatch({ type: "edit", payload: { id: id, text: text } })
  }

  const toggleComplete = (id: string): void => {
    dispatch({ type: "toggle", payload: id });
  }

  const deleteTodo = (id: string) => {
    if (!window.confirm("Do you wish to delete this todo?")) return;
    dispatch({ type: "delete", payload: id });
  }

  return { todos, addTodo, editTodo, toggleComplete, deleteTodo }
}

export default useTodos