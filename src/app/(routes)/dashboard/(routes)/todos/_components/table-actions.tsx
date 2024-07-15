import type { Todo } from "@/lib/definitions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";

interface TableActionsProps {
  setTodo: Dispatch<SetStateAction<Todo | undefined>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  todo: Todo;
}

export default function TableActions({
  todo,
  setTodo,
  setIsDialogOpen,
}: TableActionsProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="absolute bottom-[18px] right-[18px] block h-4 w-4 rounded-none"
          size="icon"
          variant="ghost"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setTodo(todo);
            setIsDialogOpen(true);
          }}
        >
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Task information</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
