import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CreateTodo } from "@/features/todos/types";
import { createTodoSchema } from "@/lib/validation/todos";

export async function GET(request: NextRequest) {

  const userId = request.cookies.get("u")?.value;
  console.log("User ID from cookies:", userId);

  if (!userId) {
    console.log("No user ID found in cookies");
    return NextResponse.json([]);
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: userId
    }
  });
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {

  const userId = request.cookies.get("u")?.value;

  if (!userId) {
    return NextResponse.json({ error: "No user" }, { status: 400 });
  }

  const body: CreateTodo = await request.json();
  const result = createTodoSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Please enter some text' }, { status: 400 });
  }

  const { text } = result.data;

  const todo = await prisma.todo.create({
    data: {
      text,
      userId,
      completed: false
    }
  });

  if (!todo) {
    console.error("Failed to create todo");
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }

  return NextResponse.json(todo, { status: 201 });
}

