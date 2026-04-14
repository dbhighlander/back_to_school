export type Todo = {
  id: string,
  text: string,
  completed: boolean
}

export interface TodoProps {
  todo: Todo,
  onEdit: (id: string, text: string) => void,
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
}
