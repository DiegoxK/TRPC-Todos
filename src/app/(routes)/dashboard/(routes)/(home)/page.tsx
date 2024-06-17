import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { ProjectCard } from "./_components/project-card";

export default async function Content() {
  const projects = await api.project.getProjects();

  return (
    <>
      <h1 className="text-xl font-medium ">Projects</h1>
      <p className="text-sm">A list of your projects</p>
      <Separator className="mb-6 mt-5 bg-zinc-700" />
      <div className="mt-4 grid grid-cols-4 gap-4">
        {[
          ...projects,
          ...projects,
          ...projects,
          ...projects,
          ...projects,
          ...projects,
        ].map((project) => (
          <ProjectCard
            key={project.id}
            projectId={project.id}
            title={project.name}
            description="Project description uwu"
          />
        ))}
      </div>
    </>
  );
}
