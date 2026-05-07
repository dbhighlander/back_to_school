import prisma from "@/lib/prisma";
import Todos from "./Todos";
import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

async function getTodos() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("u")?.value;

  if (!userId) return [];

  return prisma.todo.findMany({
    where: { userId, deletedAt: null },
  });
}

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Todos />
    </HydrationBoundary>
  );
}
