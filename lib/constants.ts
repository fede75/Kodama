export const DEFAULT_USER_EMAIL = "dev@kodama.local";

export const CARE_EVENT_LABELS = {
  WATERING: "Riego",
  FERTILIZING: "Abonado",
  PRUNING: "Poda",
  REPOTTING: "Trasplante",
  WIRING: "Alambrado"
} as const;

export const CARE_EVENT_OPTIONS = Object.entries(CARE_EVENT_LABELS).map(
  ([value, label]) => ({
    value,
    label
  })
);
