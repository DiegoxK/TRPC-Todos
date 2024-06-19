"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavLinkProps {
  icon: ReactNode;
  href: string;

  className?: string;
  children: React.ReactNode;
  toggleOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NavLink({
  icon,
  href,

  className,
  children,
  toggleOpen,
  ...props
}: NavLinkProps): JSX.Element | null {
  const path = usePathname();
  const pathname = path.replace("/dashboard", "");

  const isActive = (href: string) => {
    if (href === "") return pathname === "";
    return pathname.startsWith(href);
  };

  return (
    <Link
      className={cn(
        "flex h-[44px] items-center rounded-sm pl-4 transition-colors hover:bg-accent hover:text-primary",
        isActive(href) &&
          "ml-0 bg-accent pl-0 text-primary before:mr-4 before:h-full before:w-[4px] before:bg-primary before:content-['|']",
        className,
      )}
      onClick={toggleOpen !== undefined ? () => toggleOpen(false) : undefined}
      href={`/dashboard${href}`}
      {...props}
    >
      <span className="mb-[1px] mr-2">{icon}</span>
      {children}
    </Link>
  );
}
