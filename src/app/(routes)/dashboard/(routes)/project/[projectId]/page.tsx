import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = params;

  const project = await api.project.getProject({
    projectId,
  });

  return (
    <>
      <h1 className="text-xl font-medium ">{project?.name}</h1>
      <p className="text-sm">Project Description</p>
      <Separator className="mb-6 mt-5 bg-zinc-700" />
      <div className="mt-4 grid grid-cols-4 gap-4">
        {project?.todos.map((todo) => (
          <div key={todo.id}>
            <h2 className="text-lg font-medium">{todo.content}</h2>
            {/* <p className="text-sm">{todo.description}</p> */}
          </div>
        ))}
      </div>
    </>
  );
}
