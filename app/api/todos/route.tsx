import { NextResponse } from "next/server";

const todos = [
  {
    id: crypto.randomUUID(),
    text: "Go shopping",
    completed: false
  },
  {
    id: crypto.randomUUID(),
    text: "Feed dog... always...",
    completed: false
  },
];

export async function GET(){
  return NextResponse.json(todos);
}