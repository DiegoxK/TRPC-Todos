import type { Session } from "next-auth";
import UserButton from "@/components/ui/user-button";
import MobileSideNav from "@/components/navigation/mobile-sidenav";
import BreadcrumbNavigation from "@/components/navigation/breadcrumb-navigation";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  return (
    <div className="sticky top-0 z-[3]">
      <header className="flex items-center justify-between bg-background px-5 py-4">
        <h1 className="text-xl font-medium text-primary">
          <MobileSideNav />
          Todo&apos;s Dashboard
        </h1>
        <UserButton session={session} />
      </header>
      <BreadcrumbNavigation />
    </div>
  );
}
