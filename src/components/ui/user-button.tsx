"use client";

import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface UserButtonProps {
  session: Session;
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Unplug } from "lucide-react";
import { useRouter } from "next/navigation";

const UserButton = ({ session }: UserButtonProps) => {
  const userImage = session?.user.image;
  const userName = session?.user.name;

  const router = useRouter();

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
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const data = await signOut({ redirect: false, callbackUrl: "/" });
            router.push(data.url);
          }}
          className="flex gap-2"
        >
          <Unplug size={18} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
