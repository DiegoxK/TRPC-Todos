import { columns, createTodo } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { api } from "@/trpc/server";
import { Separator } from "@/components/ui/separator";

export default async function TodosPage() {
  const todos = await api.todo.getTodosWithProject();

  return (
    <div className="bottom-2 space-y-4 rounded-md border border-zinc-700 bg-accent p-4">
      <div>
        <h1 className="text-xl font-medium ">Todos</h1>
        <p className="text-sm">A list of all your todos</p>
      </div>
      <Separator className="mb-6 mt-5 bg-zinc-700" />
      <DataTable mutation={createTodo} columns={columns} data={todos} />
    </div>
  );
}
