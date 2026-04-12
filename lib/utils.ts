import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string, locale = "es-ES") {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string, locale = "es-ES") {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

export function calculateEstimatedAge(
  acquiredAt: Date | string | null | undefined,
  ageAtAcquisitionYears: number | null | undefined,
  referenceDate: Date = new Date()
) {
  if (!acquiredAt || ageAtAcquisitionYears == null) {
    return null;
  }

  const acquiredDate = new Date(acquiredAt);

  if (Number.isNaN(acquiredDate.getTime())) {
    return null;
  }

  const yearsElapsed =
    (referenceDate.getTime() - acquiredDate.getTime()) /
    (1000 * 60 * 60 * 24 * 365.25);

  return Math.max(ageAtAcquisitionYears + Math.floor(yearsElapsed), 0);
}
