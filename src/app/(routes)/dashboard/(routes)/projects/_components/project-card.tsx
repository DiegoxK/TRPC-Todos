import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";

export const ProjectCard = ({
  projectSlug,
  title,
  description,
}: {
  projectSlug: string;
  title: string;
  description?: string | null;
}) => {
  if (description) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/dashboard/projects/${projectSlug}`}>
              <Button
                variant="ghost"
                size="margin"
                className="flex w-full items-start justify-start gap-2 rounded-lg border bg-background px-6 py-4 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-primary"
              >
                <Folder size={28} className="mt-1" />
                <div className="text-start">
                  <h2 className="text-lg font-semibold text-zinc-300">
                    {title}
                  </h2>
                  <p className="text-sm text-zinc-500">
                    {description.slice(0, 20)} ...
                  </p>
                </div>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={10}>
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link href={`/dashboard/projects/${projectSlug}`}>
      <Button
        variant="ghost"
        size="margin"
        className="flex w-full items-center justify-start gap-2 rounded-lg border bg-background px-6 py-4 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-primary"
      >
        <Folder size={28} className="mt-1" />
        <div className="text-start">
          <h2 className="text-lg font-semibold text-zinc-300">{title}</h2>
        </div>
      </Button>
    </Link>
  );
};
