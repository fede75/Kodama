"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon?: "home" | "settings" | "admin";
};

function NavIcon({ icon }: { icon: NonNullable<NavItem["icon"]> }) {
  if (icon === "home") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-[1.5rem] w-[1.5rem]">
        <path d="M3.5 9.2 10 4l6.5 5.2v6.1a1.2 1.2 0 0 1-1.2 1.2h-2.8v-4.4H7.5v4.4H4.7a1.2 1.2 0 0 1-1.2-1.2V9.2Z" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "settings") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-[1.5rem] w-[1.5rem]">
        <path d="M10 7.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" stroke="currentColor" strokeWidth="1.45" />
        <path d="M16.1 11.1v-2.2l-1.6-.4a4.8 4.8 0 0 0-.5-1.2l.9-1.4-1.6-1.6-1.4.9c-.4-.2-.8-.4-1.2-.5l-.4-1.6H8l-.4 1.6c-.4.1-.8.3-1.2.5L5 4.3 3.4 5.9l.9 1.4c-.2.4-.4.8-.5 1.2l-1.6.4v2.2l1.6.4c.1.4.3.8.5 1.2l-.9 1.4L5 17.3l1.4-.9c.4.2.8.4 1.2.5l.4 1.6h2.2l.4-1.6c.4-.1.8-.3 1.2-.5l1.4.9 1.6-1.6-.9-1.4c.2-.4.4-.8.5-1.2l1.6-.4Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-[1.5rem] w-[1.5rem]">
      <path d="M10 2.8 4.2 5v4.1c0 4 2.6 6.8 5.8 8 3.2-1.2 5.8-4 5.8-8V5L10 2.8Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" />
      <path d="M7.8 9.1a2.2 2.2 0 1 1 4.4 0 2.2 2.2 0 0 1-4.4 0Zm-.3 4.1c.7-.8 1.6-1.2 2.5-1.2s1.8.4 2.5 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

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
    <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 text-[0.95rem] font-semibold text-paper/70 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0 lg:pb-0">
      {items.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.icon ? item.label : undefined}
            aria-label={item.label}
            className={cn(
              "relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 tracking-[0.01em] transition duration-300",
              active
                ? "bg-white/[0.06] text-paper"
                : "text-paper/62 hover:bg-white/[0.03] hover:text-paper"
            )}
          >
            {item.icon ? (
              <span className="inline-flex items-center justify-center">
                <NavIcon icon={item.icon} />
              </span>
            ) : (
              item.label
            )}
          </Link>
        );
      })}
    </nav>
  );
}
