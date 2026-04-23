"use client"
import todosReducer from "./todosReducer";
import { Todo } from "./types";
import { useCallback, useReducer } from "react";

const useTodos = (initialTodos: Todo[]) => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos)

  const addTodo = async (text: string) => {

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch({ type: "add", payload: { id: data.id, text: data.text } });
    } else {
      console.error("Failed to add todo");
    }
  }

  const editTodo = useCallback(async (id: string, text: string) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const updatedTodo = await res.json();
      dispatch({ type: "edit", payload: { id: updatedTodo.id, text: updatedTodo.text } })
    } else {
      console.error("Failed to toggle todo");
    }
  }, []);

  const toggleComplete = useCallback(async (todo: Todo) => {
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    if (res.ok) {
      const updatedTodo = await res.json();
      dispatch({ type: "toggle", payload: updatedTodo });
    } else {
      console.error("Failed to toggle todo");
    }
  }, []);

  const deleteTodo = useCallback( async(id: string) => {
    if (!window.confirm("Do you wish to delete this todo?")) return;
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const deletePayload = await res.json();
      if(deletePayload.id) {
        dispatch({ type: "delete", payload: deletePayload.id });
      } else {        
        console.error("Failed to delete todo: No ID returned");
      }
    } else {
      console.error("Failed to toggle todo");
    }
    
  }, []);

  return { todos, addTodo, editTodo, toggleComplete, deleteTodo }
}

export default useTodos