import prisma from "@/lib/prisma";
import Todos from "./Todos";
import { cookies } from "next/headers";

async function getTodos() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("u")?.value;

  if (!userId) return [];

  return prisma.todo.findMany({
    where: { userId, deletedAt: null },
  });
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <Todos initialTodos={todos} />
  );
}
