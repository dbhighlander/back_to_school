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

export interface TodoFooterProps{
  onAdd: (text:string) => void
}

export type TodoAction = 
{type: "add"; payload: string}
| {type: "delete"; payload: string}
| {type: "toggle"; payload: string}
| {type: "edit"; payload: { id: string; text: string }}