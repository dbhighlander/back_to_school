import { Todo, TodoAction } from "./types";

export default function todosReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { id: action.payload.id, text: action.payload.text, completed: false }
      ];
    case 'delete':
      return state.filter(todo => todo.id !== action.payload)
    case 'edit':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case 'toggle':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.completed }
          : todo
      );
    default:
      return state;
  }
}