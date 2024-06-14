import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Folder } from "lucide-react";
import Link from "next/link";

export default function Content() {
  return (
    <>
      <h1 className="text-xl font-medium ">Projects</h1>
      <p className="text-sm">A list of your projects</p>
      <Separator className="mb-6 mt-5 bg-zinc-700" />
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
    <Link href="/dashboard/projects/1">
      <Button
        variant="ghost"
        size="margin"
        className="flex w-full items-start justify-start gap-2 rounded-lg border bg-background px-6 py-4 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-primary"
      >
        <Folder size={28} className="mt-1" />
        <div className="text-start">
          <h2 className="text-lg font-semibold text-zinc-300">Portfolio</h2>
          <p className="text-sm text-zinc-500">Portfolio todos</p>
        </div>
      </Button>
    </Link>
  );
};
