import type { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { Button } from "../ui/button";
import { Unplug } from "lucide-react";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  // TODO: Add breadcrumbs
  return (
    <header className="flex items-center justify-between bg-accent px-7 py-4">
      <h1 className="text-xl">Dashboard</h1>
      <UserButton session={session} />
    </header>
  );
}

const UserButton = ({ session }: HeaderProps) => {
  const userImage = session?.user.image;
  const userName = session?.user.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="glassy-container cursor-pointer rounded-full"
        >
          {userImage ? (
            <Image
              className="rounded-full"
              src={userImage}
              alt="profile picture"
              width={40}
              height={40}
            />
          ) : (
            userName && (
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary font-bold">
                {userName[0]?.toUpperCase()}
              </div>
            )
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          <Unplug size={18} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
