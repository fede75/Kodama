import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-clay-300 focus-visible:ring-offset-2",
        variant === "primary"
          ? "bg-ink-900 text-paper hover:bg-clay-700"
          : "border border-ink-200 bg-white/70 text-ink-800 hover:border-clay-300 hover:text-clay-700",
        className
      )}
      {...props}
    />
  );
}
