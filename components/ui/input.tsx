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
          "field-surface w-full rounded-[1.25rem] px-4 py-3.5 text-[0.98rem] text-paper placeholder:text-paper/28 focus:border-moss-500/60 focus:ring-2 focus:ring-moss-500/18",
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
        "field-surface min-h-36 w-full rounded-[1.35rem] px-4 py-3.5 text-[0.98rem] leading-7 text-paper placeholder:text-paper/28 focus:border-moss-500/60 focus:ring-2 focus:ring-moss-500/18",
        className
      )}
      {...props}
    />
  );
}
