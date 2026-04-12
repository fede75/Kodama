import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "field-surface w-full rounded-[1.25rem] px-4 py-3.5 text-[0.98rem] text-paper focus:border-moss-500/60 focus:ring-2 focus:ring-moss-500/18",
        className
      )}
      {...props}
    />
  );
}
