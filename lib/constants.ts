export const CARE_EVENT_LABELS = {
  WATERING: "Riego",
  FERTILIZING: "Abonado",
  PRUNING: "Poda",
  PINCHING: "Pinzado",
  REPOTTING: "Trasplante",
  WIRING: "Alambrado",
  DEFOLIATION: "Defoliado",
  PEST_TREATMENT: "Tratamiento"
} as const;

export const CARE_EVENT_OPTIONS = Object.entries(CARE_EVENT_LABELS).map(
  ([value, label]) => ({
    value,
    label
  })
);
