import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-bark-200 bg-white px-4 py-3 text-sm text-bark-900 focus:border-moss-500 focus:ring-2 focus:ring-moss-200",
        className
      )}
      {...props}
    />
  );
}
