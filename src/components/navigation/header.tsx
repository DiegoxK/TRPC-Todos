import type { Session } from "next-auth";
import UserButton from "@/components/ui/user-button";
import MobileSideNav from "@/components/navigation/mobile-sidenav";
import BreadcrumbNavigation from "@/components/navigation/breadcrumb-navigation";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  return (
    <div className="fixed w-full md:w-[calc(100%-20rem)]">
      <header className="flex items-center justify-between bg-background px-7 py-4">
        <h1 className="text-xl font-medium text-primary">
          <MobileSideNav />
          <div className="hidden items-center gap-2 md:flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Bacavailando"
              src="https://media.tenor.com/9egJp0qwy_UAAAAi/polish-cow-polish.gif"
              width={36}
            />
            Bacavailando
          </div>
        </h1>
        <UserButton session={session} />
      </header>
      <BreadcrumbNavigation />
    </div>
  );
}
