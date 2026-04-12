import Link from "next/link";
import { getCareEventLabel, getDictionary, getIntlLocale, type Locale } from "@/lib/i18n";
import { formatDateTime } from "@/lib/utils";
import { DeleteCareEventForm } from "@/components/bonsais/delete-care-event-form";

type CareEventListItem = {
  id: string;
  bonsaiId: string;
  type:
    | "WATERING"
    | "FERTILIZING"
    | "PRUNING"
    | "PINCHING"
    | "REPOTTING"
    | "WIRING"
    | "DEFOLIATION"
    | "PEST_TREATMENT";
  title: string | null;
  notes: string | null;
  performedAt: Date;
  photos: Array<{
    id: string;
    imageUrl: string;
    caption: string | null;
    isPrimary: boolean;
    takenAt: Date;
  }>;
};

export function CareEventsList({
  bonsaiId,
  items,
  readOnly = false,
  locale
}: {
  bonsaiId: string;
  items: CareEventListItem[];
  readOnly?: boolean;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const intlLocale = getIntlLocale(locale);

  if (items.length === 0) {
    return (
      <p className="rounded-[1.8rem] bg-white/[0.035] px-5 py-6 text-sm text-paper/56">
        {dict.common.noCareYet}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const mainPhoto = item.photos[0] ?? null;
        const extraPhotos = item.photos.slice(1, 4);

        return (
          <article
            key={item.id}
            className="relative overflow-hidden rounded-[2rem] surface-soft p-5 shadow-[0_26px_70px_-46px_rgba(0,0,0,0.95)] sm:p-6"
          >
            <div className="relative flex flex-col gap-5 xl:flex-row xl:items-start xl:gap-7">
              <div className="xl:w-[12rem] xl:shrink-0">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-paper/44">
                  {locale === "es" ? "Fecha" : locale === "en" ? "Date" : "日付"}
                </p>
                <p className="mt-2 text-sm leading-6 text-moss-100 sm:text-base">
                  {formatDateTime(item.performedAt, intlLocale)}
                </p>
              </div>

              <div className="xl:w-[11rem] xl:shrink-0">
                {readOnly ? (
                  <p className="font-display text-[clamp(1.55rem,3.2vw,1.9rem)] leading-[1.02] text-paper">
                    {getCareEventLabel(locale, item.type)}
                  </p>
                ) : (
                  <Link
                    href={`/bonsais/${bonsaiId}/eventos/${item.id}/editar`}
                    className="inline-flex font-display text-[clamp(1.55rem,3.2vw,1.9rem)] leading-[1.02] text-paper transition hover:text-moss-200"
                  >
                    {getCareEventLabel(locale, item.type)}
                  </Link>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <p className="text-[0.98rem] leading-7 text-paper/78">
                  {item.notes ?? (locale === "es" ? "Sin notas" : locale === "en" ? "No notes" : "メモなし")}
                </p>
                {extraPhotos.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {extraPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="w-14 shrink-0 overflow-hidden rounded-[0.9rem] bg-black/20"
                      >
                        <img
                          src={photo.imageUrl}
                          alt={photo.caption ?? (locale === "es" ? "Imagen del cuidado" : locale === "en" ? "Care image" : "手入れの画像")}
                          className="aspect-square w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {!readOnly ? (
                <div className="shrink-0 scale-[0.92] origin-left lg:origin-center">
                  <DeleteCareEventForm bonsaiId={bonsaiId} careEventId={item.id} />
                </div>
              ) : null}

              <div className="shrink-0 self-start xl:self-center">
                {mainPhoto ? (
                  <div className="w-[4.5rem] overflow-hidden rounded-[1rem] bg-black/20 sm:w-[5.5rem]">
                    <img
                      src={mainPhoto.imageUrl}
                      alt={mainPhoto.caption ?? (locale === "es" ? "Imagen principal del cuidado" : locale === "en" ? "Main care image" : "手入れのメイン画像")}
                      className="aspect-[4/5] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex w-[4.5rem] items-end rounded-[1rem] bg-[linear-gradient(135deg,rgba(111,149,70,0.2),rgba(10,13,12,0.85))] p-2 text-[10px] font-medium uppercase tracking-[0.08em] text-paper/44 sm:w-[5.5rem] sm:p-3 sm:text-[11px]">
                    {dict.common.noPhoto}
                  </div>
                )}
              </div>
            </div>
            {index < items.length - 1 ? (
              <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
