import { Payment, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
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
