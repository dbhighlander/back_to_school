import { Todo, TodoDelete } from "./types";

//Narrow the type of unknown data to an array of Todo objects
export function isTodoArray(value: unknown): value is Todo[] {
  return (
    Array.isArray(value) &&
    value.every(
      item => typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        typeof item.completed === 'boolean'
    )
  )
}

//Narrow the type of unknown data to a single Todo object
export function isTodo(value: unknown): value is Todo {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Todo).id === 'string' &&
    typeof (value as Todo).text === 'string' &&
    typeof (value as Todo).completed === 'boolean'
  );
}

//Narrow the type of unknown data to a TodoDelete object
export function isTodoDelete(value: unknown): value is TodoDelete {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as TodoDelete).id === 'string' &&
    ((value as TodoDelete).deletedAt === undefined || (value as TodoDelete).deletedAt instanceof Date)
  );
}