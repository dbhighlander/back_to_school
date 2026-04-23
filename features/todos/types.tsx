export type Todo = {
  id: string,
  text: string,
  completed: boolean
}

export interface TodoItemProps {
  todo: Todo,
  onEdit: (id: string, text: string) => void,
  onToggle: (todo: Todo) => void,
  onDelete: (id: string) => void
}

export interface TodoProps {
  initialTodos: Todo[]
}

export interface TodoFooterProps {
  onAdd: (text: string) => void
}

export type TodoAction =
  { type: "add"; payload: { id: string; text: string } }
  | { type: "delete"; payload: string }
  | { type: "toggle"; payload: Todo }
  | { type: "edit"; payload: { id: string; text: string } }

export type CreateTodo = {
  text: string
}

export type UpdateTodo = {
  text?: string;
  completed?: boolean;
}