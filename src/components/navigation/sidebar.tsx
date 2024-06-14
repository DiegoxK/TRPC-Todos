import { Separator } from "@/components/ui/separator";

import { BookCheck, Home, SlidersHorizontal } from "lucide-react";

import { NavLink } from "@/components/navigation/nav-link";

export default function Sidebar() {
  const links = [
    {
      label: "Home",
      icon: <Home className="text-primary" size={20} />,
      href: "/dashboard",
    },
    {
      label: "Todos",
      icon: <BookCheck className="text-primary" size={20} />,
      href: "/dashboard/todos",
    },
  ];

  return (
    <section className="fixed flex h-screen max-h-screen w-[20rem] flex-col bg-accent p-6 shadow-md">
      <p className="text-3xl font-semibold">
        To<span className="text-primary">do.</span>
      </p>
      <Separator className="my-7 bg-white" />
      <nav className="flex grow flex-col justify-between">
        <div className="space-y-2">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} icon={link.icon}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <NavLink
          href="/dashboard/settings"
          icon={<SlidersHorizontal className="text-primary" size={20} />}
        >
          Settings
        </NavLink>
      </nav>
    </section>
  );
}
