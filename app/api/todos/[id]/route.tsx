import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TodoDelete, UpdateTodo } from "@/features/todos/types";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = request.cookies.get("u")?.value;
  if (!userId) {
    return NextResponse.json({ error: "No user" }, { status: 400 });
  }

  const { id } = await params;

  const existingTodo = await prisma.todo.findFirst({
    where: {
      id,
      userId
    }
  });

  if (!existingTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const { text, completed }: UpdateTodo = await request.json();

  console.log("Updating todo:", { id, text, completed });

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
      userId
    },
    data: {
      ...(text !== undefined && { text }),
      ...((completed !== undefined) && { completed })
    }
  });

  return NextResponse.json(updatedTodo);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = request.cookies.get("u")?.value;
  if (!userId) {
    return NextResponse.json({ error: "No user" }, { status: 400 });
  }

  const { id } = await params;

  const existingTodo = await prisma.todo.findFirst({
    where: {
      id,
      userId
    }
  });

  if (!existingTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
      userId
    },
    data: {
      deletedAt: new Date()
    }
  });

  return NextResponse.json({ id, deletedAt: updatedTodo.deletedAt } as TodoDelete);
}