"use client";
import type { todos } from "@/server/db/schema";
import { api } from "@/trpc/react";

type Todo = typeof todos.$inferSelect;

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const { data: todos, refetch } = api.todo.getTodos.useQuery(undefined, {
    initialData: initialTodos,
  });

  const setDone = api.todo.setDone.useMutation({
    onSettled: async () => {
      await refetch();
    },
  });

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={async () => {
              setDone.mutate({
                id: todo.id,
                done: !todo.done,
              });
            }}
          />
          <span>{todo.content}</span>
        </div>
      ))}
    </div>
  );
}
