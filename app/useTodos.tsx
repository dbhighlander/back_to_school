import { Todo } from "./types";
import { useState } from "react";

const useTodos = (initialProps: Todo[]) => {
  const [todos, setTodos] = useState<Todo[]>(initialProps);

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

  return { todos, addTodo, editTodo, toggleComplete, deleteTodo }
}

export default useTodos