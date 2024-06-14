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
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        "flex h-[44px] items-center pl-4 transition-colors hover:bg-background hover:text-primary",
        isActive &&
          "ml-0 bg-background pl-0 text-primary before:mr-4 before:h-full before:w-[4px] before:bg-primary before:content-['|']",
        className,
      )}
      onClick={toggleOpen !== undefined ? () => toggleOpen(false) : undefined}
      href={href}
      {...props}
    >
      <span className="mb-[1px] mr-2">{icon}</span>
      {children}
    </Link>
  );
}
