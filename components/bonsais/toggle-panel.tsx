"use client";

import { useState } from "react";

export function TogglePanel({
  buttonLabel,
  children
}: {
  buttonLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full border border-white/14 bg-white/[0.03] px-4 py-2 text-sm font-medium text-paper transition hover:border-white/24 hover:bg-white/[0.08]"
      >
        {open ? "Cerrar" : buttonLabel}
      </button>

      {open ? children : null}
    </div>
  );
}
