import Todos from "./Todos";

async function getTodos(){
  const res = await fetch('http://localhost:3000/api/todos', {
    cache: 'no-store', 
  });

  return res.json();
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <Todos initialTodos={todos}/>
  );
}
