import { Separator } from "@/components/ui/separator";

import {
  BookCheck,
  Home,
  type LucideIcon,
  SlidersHorizontal,
  Unplug,
} from "lucide-react";

import Link from "next/link";

export default function Sidebar() {
  const links = [
    {
      label: "Home",
      icon: Home,
      href: "/home",
    },
    {
      label: "Todos",
      icon: BookCheck,
      href: "/todos",
    },
    {
      label: "Settings",
      icon: SlidersHorizontal,
      href: "/settings",
    },
  ];

  return (
    <section className="flex h-screen max-h-screen w-3/12 flex-col bg-accent p-4 shadow-md">
      <p className="text-3xl font-semibold">
        To<span className="text-primary">do.</span>
      </p>
      <Separator className="my-7 bg-white" />
      <nav className="flex grow flex-col justify-between">
        <div className="space-y-6">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} Icon={link.icon}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <NavLink href="/logout" Icon={Unplug}>
          Logout
        </NavLink>
      </nav>
    </section>
  );
}

const NavLink = ({
  children,
  Icon,
  href,
}: {
  children: React.ReactNode;
  Icon: LucideIcon;
  href: string;
}) => {
  return (
    <Link href={href} className="flex items-center ">
      <span className="mr-2">
        <Icon className="text-primary" size={20} />
      </span>
      {children}
    </Link>
  );
};
