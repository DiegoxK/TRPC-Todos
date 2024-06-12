import type { Session } from "next-auth";
import Image from "next/image";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-accent px-7 py-4">
      <h1 className="text-xl">Dashboard</h1>
      {session?.user.image && (
        <div className="glassy-container rounded-full">
          <Image
            className="rounded-full"
            src={session.user.image}
            alt="profile picture"
            width={40}
            height={40}
          />
        </div>
      )}
    </header>
  );
}
