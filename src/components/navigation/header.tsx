import type { Session } from "next-auth";
import UserButton from "../ui/user-button";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  // TODO: Add breadcrumbs
  return (
    <header className="fixed flex w-[calc(100%-20rem)] items-center justify-between bg-background px-7 py-4">
      <h1 className="flex items-center gap-2 text-xl font-medium text-primary">
        {/* Add button to retract the sidebar */}
        <img
          src="https://media.tenor.com/9egJp0qwy_UAAAAi/polish-cow-polish.gif"
          width={36}
        />
        Bacavailando
      </h1>
      <UserButton session={session} />
    </header>
  );
}
