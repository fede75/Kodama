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
    <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 text-[0.95rem] font-semibold text-paper/72 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0 lg:pb-0">
      {items.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 tracking-[0.01em] transition duration-300",
              active
                ? "bg-white/[0.08] text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                : "text-paper/68 hover:bg-white/[0.045] hover:text-paper"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
