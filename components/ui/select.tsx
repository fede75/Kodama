import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-paper focus:border-moss-500/60 focus:ring-2 focus:ring-moss-500/20",
        className
      )}
      {...props}
    />
  );
}
