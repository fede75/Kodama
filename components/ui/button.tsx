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
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:ring-offset-2",
        variant === "primary"
          ? "bg-moss-700 text-white hover:bg-moss-800"
          : "border border-bark-200 bg-white text-bark-800 hover:border-moss-400 hover:text-moss-800",
        className
      )}
      {...props}
    />
  );
}
