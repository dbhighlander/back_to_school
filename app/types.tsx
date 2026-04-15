export type Todo = {
  id: string,
  text: string,
  completed: boolean
}

export interface TodoItemProps {
  todo: Todo,
  onEdit: (id: string, text: string) => void,
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
}

export interface TodoProps {
  initialTodos: Todo[]
}