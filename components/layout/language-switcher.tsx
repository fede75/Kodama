"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  LOCALE_COOKIE_NAME,
  LOCALE_META,
  SUPPORTED_LOCALES,
  type Locale
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function setLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.035] p-1">
      {SUPPORTED_LOCALES.map((item) => {
        const meta = LOCALE_META[item];
        const active = item === locale;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            disabled={isPending && active}
            title={meta.label}
            aria-label={meta.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold transition sm:px-3",
              active
                ? "bg-white/[0.08] text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                : "text-paper/62 hover:bg-white/[0.05] hover:text-paper"
            )}
          >
            <span aria-hidden="true" className="text-sm leading-none">
              {meta.flag}
            </span>
            <span>{meta.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
