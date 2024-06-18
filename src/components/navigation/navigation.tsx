import { Separator } from "@/components/ui/separator";

import { BookCheck, Home, SlidersHorizontal } from "lucide-react";

import { NavLink } from "@/components/navigation/nav-link";

export default function Navigation() {
  const links = [
    {
      label: "Home",
      icon: <Home className="text-primary" size={20} />,
      subRoutes: ["/project"],
      href: "",
    },
    {
      label: "Todos",
      icon: <BookCheck className="text-primary" size={20} />,
      href: "/todos",
    },
  ];
  return (
    <>
      <p className="text-3xl font-semibold">
        To<span className="text-primary">do.</span>
      </p>
      <p className="text-sm text-accent-foreground">
        Your personal task manager{" "}
      </p>
      <Separator className="my-7 bg-white" />
      <nav className="flex grow flex-col justify-between">
        <div className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.href}
              subRoutes={link.subRoutes}
              href={link.href}
              icon={link.icon}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <NavLink
          href="/settings"
          icon={<SlidersHorizontal className="text-primary" size={20} />}
        >
          Settings
        </NavLink>
      </nav>
    </>
  );
}
