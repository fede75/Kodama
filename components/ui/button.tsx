import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
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
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[0.95rem] font-semibold tracking-[0.01em] transition duration-300 focus-visible:ring-2 focus-visible:ring-moss-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d0c]",
        variant === "primary"
          ? "bg-[linear-gradient(135deg,rgba(126,159,82,0.95),rgba(74,97,50,0.95))] text-paper shadow-[0_18px_42px_-28px_rgba(0,0,0,0.92)] hover:-translate-y-0.5 hover:brightness-[1.04]"
          : variant === "danger"
            ? "border border-red-900/40 bg-[linear-gradient(180deg,rgba(117,31,31,0.24),rgba(84,18,18,0.22))] text-red-100 hover:-translate-y-0.5 hover:border-red-800/50 hover:bg-[linear-gradient(180deg,rgba(117,31,31,0.28),rgba(84,18,18,0.28))]"
            : "border border-white/8 bg-white/[0.025] text-paper/82 hover:-translate-y-0.5 hover:border-white/14 hover:bg-white/[0.055] hover:text-paper",
        className
      )}
      {...props}
    />
  );
}
