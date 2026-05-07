"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./types";
import { useCallback} from "react";
import { isTodo, isTodoArray, isTodoDelete } from "./validation";

const useTodos = () => {

  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos');
      if (!res.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data: unknown = await res.json();
      if (!isTodoArray(data)) {
        throw new Error('Invalid data format');
      }
      return data
    }
  });

  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch('api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        throw new Error('Failed to add todo');
      }
      return res.json();
    },
    onMutate: async (text: string) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

      const optimisticTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
      };

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [
        ...old,
        optimisticTodo
      ]);

      return { previousTodos };
    },
    onError: (_err, _text, ctx) => {
      queryClient.setQueryData(['todos'], ctx?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const editTodoMutation = useMutation({
    mutationFn: async ({ id, text }: { id: string, text: string }) => {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error('Failed to edit todo');
      }

      const data: unknown = await res.json();
      if (!isTodo(data)) {
        throw new Error('Invalid data format');
      }
      return data;
    },
    onMutate: async ({ id, text }: { id: string, text: string }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map(todo =>
          todo.id === id
            ? { ...todo, text }
            : todo
        )
      );

      return { previousTodos };
    },
    onError: (_err, _text, ctx) => {
      queryClient.setQueryData(['todos'], ctx?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  })

  const editTodo = useCallback(async (id: string, text: string) => {
    editTodoMutation.mutate({ id, text });
  }, [editTodoMutation]);

  const toggleCompleteMutation = useMutation({
    mutationFn: async ( todo: Todo ) => {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!res.ok) {
        throw new Error('Failed to edit todo');
      }

      const data: unknown = await res.json();
      if (!isTodo(data)) {
        throw new Error('Invalid data format');
      }
      return data;
    },
    onMutate: async (todo: Todo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map(existingTodo =>
          existingTodo.id === todo.id
            ? { ...existingTodo, completed: !existingTodo.completed }
            : existingTodo
        )
      );

      return { previousTodos };
    },
    onError: (_err, _text, ctx) => {
      queryClient.setQueryData(['todos'], ctx?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  })

  const toggleComplete = useCallback(async (todo: Todo) => {
    toggleCompleteMutation.mutate(todo);
  }, [toggleCompleteMutation]);

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete todo');
      }

      const data: unknown = await res.json();
      if (!isTodoDelete(data)) {
        throw new Error('Invalid data format');
      }
      return data;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.filter(existingTodo =>
          existingTodo.id !== id
        )
      );

      return { previousTodos };
    },
    onError: (_err, _text, ctx) => {
      queryClient.setQueryData(['todos'], ctx?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  })

  const deleteTodo = useCallback(async (id: string) => {
    if(!confirm("Are you sure you want to delete this todo?")) {
      return;
    }
    deleteTodoMutation.mutate(id);
  }, [deleteTodoMutation]);

  const addTodo = useCallback((text: string) => {
    addTodoMutation.mutate(text);
  }, [addTodoMutation]);

  return { todos, addTodo, editTodo, toggleComplete, deleteTodo }
}

export default useTodos