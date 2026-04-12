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
        className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-sm font-semibold text-paper/82 transition hover:border-white/16 hover:bg-white/[0.06]"
      >
        {open ? "Cerrar" : buttonLabel}
      </button>

      {open ? children : null}
    </div>
  );
}
