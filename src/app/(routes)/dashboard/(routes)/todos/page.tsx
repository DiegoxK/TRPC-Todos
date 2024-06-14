import type { Todo } from "@/lib/definitions";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { api } from "@/trpc/server";
import { Separator } from "@/components/ui/separator";

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
      <Separator className="mb-6 mt-5 bg-zinc-700" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
