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
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-semibold tracking-[0.02em] transition duration-300 focus-visible:ring-2 focus-visible:ring-moss-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d0c]",
        variant === "primary"
          ? "bg-[linear-gradient(135deg,rgba(129,165,85,0.96),rgba(72,95,49,0.96))] text-paper shadow-[0_22px_48px_-28px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.95)]"
          : "border border-white/10 bg-white/[0.035] text-paper/84 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.07] hover:text-paper",
        className
      )}
      {...props}
    />
  );
}
