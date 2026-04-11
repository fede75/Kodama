import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes
} from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-paper placeholder:text-paper/28 focus:border-moss-500/60 focus:ring-2 focus:ring-moss-500/20",
          className
        )}
        {...props}
      />
    );
  }
);

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-paper placeholder:text-paper/28 focus:border-moss-500/60 focus:ring-2 focus:ring-moss-500/20",
        className
      )}
      {...props}
    />
  );
}
