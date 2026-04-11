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
          "w-full rounded-2xl border border-bark-200 bg-white px-4 py-3 text-sm text-bark-900 placeholder:text-bark-400 focus:border-moss-500 focus:ring-2 focus:ring-moss-200",
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
        "min-h-32 w-full rounded-2xl border border-bark-200 bg-white px-4 py-3 text-sm text-bark-900 placeholder:text-bark-400 focus:border-moss-500 focus:ring-2 focus:ring-moss-200",
        className
      )}
      {...props}
    />
  );
}
