import type { Todo } from "@/lib/definitions";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { api } from "@/trpc/server";

async function getData(): Promise<Todo[]> {
  const todos = await api.todo.getTodos();
  return todos;
}

export default async function TodosPage() {
  const data = await getData();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-medium ">Todos</h1>
        <p className="text-sm">A list of all your todos</p>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
