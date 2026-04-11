"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/bonsais/new") {
    return pathname === "/bonsais/new";
  }

  if (href === "/bonsais") {
    return pathname === "/bonsais" || (pathname.startsWith("/bonsais/") && !pathname.startsWith("/bonsais/new"));
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-1 text-sm font-medium text-paper/62 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0 lg:pb-0">
      {items.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative shrink-0 whitespace-nowrap rounded-full px-1 py-1 transition duration-300",
              "after:absolute after:left-1 after:right-1 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-moss-400/80 after:to-transparent after:transition after:duration-300",
              active
                ? "text-paper after:scale-x-100"
                : "hover:text-paper hover:after:scale-x-100"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
