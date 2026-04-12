"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function TogglePanel({
  buttonLabel,
  buttonClassName,
  buttonIcon,
  children
}: {
  buttonLabel: string;
  buttonClassName?: string;
  buttonIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.03] px-4 py-2 text-sm font-medium text-paper transition hover:border-white/24 hover:bg-white/[0.08]",
          buttonClassName
        )}
      >
        {!open ? buttonIcon : null}
        {open ? "Cerrar" : buttonLabel}
      </button>

      {open ? children : null}
    </div>
  );
}
