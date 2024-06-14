import { Folder } from "lucide-react";

export default function Content() {
  return (
    <>
      <h1 className="text-xl font-medium ">Projects</h1>
      <p className="text-sm">A list of all your todos</p>
      <div className="mt-4 grid grid-cols-4 gap-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </>
  );
}

const ProjectCard = () => {
  return (
    <div className="flex gap-2 rounded-lg bg-zinc-800 px-6 py-4 hover:outline hover:outline-2 hover:outline-primary">
      <Folder className="mt-1" />
      <div>
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <p className="text-accent-background text-sm">Portfolio todos</p>
      </div>
    </div>
  );
};
