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
    <div className="flex items-center gap-0.5">
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
              "inline-flex h-8 w-8 items-center justify-center rounded-full text-base leading-none transition sm:h-9 sm:w-9",
              active
                ? "bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                : "opacity-72 hover:bg-white/[0.04] hover:opacity-100"
            )}
          >
            <span aria-hidden="true">
              {meta.flag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
