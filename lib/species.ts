import { type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/i18n";

type SeasonalFrequency = {
  spring: number | null;
  summer: number | null;
  autumn: number | null;
  winter: number | null;
};

type SpeciesTranslationBlock = {
  commonName: string;
  scientificName: string;
  placement: { notes: string | null };
  temperature: { notes: string | null };
  watering: { notes: string | null };
  fertilizing: { notes: string | null };
  pruning: { notes: string | null };
  repotting: { notes: string | null };
  substrate: { notes: string | null };
};

export type SpeciesJsonInput = {
  slug: string;
  placement: {
    type: "OUTDOOR" | "INDOOR" | "OUTDOOR_PROTECTED" | "GREENHOUSE" | null;
    light:
      | "FULL_SUN"
      | "PARTIAL_SUN"
      | "BRIGHT_SHADE"
      | "SHADE"
      | "INDOOR_BRIGHT"
      | null;
    sunHours: number | null;
  };
  temperature: {
    min: number | null;
    max: number | null;
  };
  watering: {
    frequencyDays: SeasonalFrequency;
  };
  fertilizing: {
    activeMonths: number[];
    frequencyDays: number | null;
  };
  pruning: {
    activeMonths: number[];
    frequencyDays: number | null;
  };
  repotting: {
    activeMonths: number[];
    frequencyDays: number | null;
  };
  substrate: {
    drainage: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | null;
  };
  risks: string[];
  translations: Record<Locale, SpeciesTranslationBlock>;
};

type SpeciesWithTranslations = Prisma.SpeciesGetPayload<{
  include: {
    translations: true;
  };
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseNullableNumber(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function parseMonthArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is number => typeof item === "number" && item >= 1 && item <= 12)
    .map((item) => Math.trunc(item));
}

function parseSeasonalFrequency(value: unknown): SeasonalFrequency {
  const record = isRecord(value) ? value : {};

  return {
    spring: parseNullableNumber(record.spring),
    summer: parseNullableNumber(record.summer),
    autumn: parseNullableNumber(record.autumn),
    winter: parseNullableNumber(record.winter)
  };
}

function parseTranslationBlock(
  value: unknown,
  localeLabel: string
): SpeciesTranslationBlock {
  if (!isRecord(value)) {
    throw new Error(`Falta el bloque de traducción ${localeLabel}.`);
  }

  const commonName = typeof value.commonName === "string" ? value.commonName.trim() : "";
  const scientificName =
    typeof value.scientificName === "string" ? value.scientificName.trim() : "";

  if (!commonName || !scientificName) {
    throw new Error(`La traducción ${localeLabel} debe incluir commonName y scientificName.`);
  }

  const getNotes = (section: string) => {
    const block = isRecord(value[section]) ? value[section] : {};
    return typeof block.notes === "string" ? block.notes.trim() || null : null;
  };

  return {
    commonName,
    scientificName,
    placement: { notes: getNotes("placement") },
    temperature: { notes: getNotes("temperature") },
    watering: { notes: getNotes("watering") },
    fertilizing: { notes: getNotes("fertilizing") },
    pruning: { notes: getNotes("pruning") },
    repotting: { notes: getNotes("repotting") },
    substrate: { notes: getNotes("substrate") }
  };
}

export function getSpeciesJsonExample(): SpeciesJsonInput {
  return {
    slug: "acebuche",
    placement: {
      type: "OUTDOOR",
      light: "FULL_SUN",
      sunHours: 6
    },
    temperature: {
      min: -3,
      max: 40
    },
    watering: {
      frequencyDays: {
        spring: 3,
        summer: 2,
        autumn: 4,
        winter: 6
      }
    },
    fertilizing: {
      activeMonths: [3, 4, 5, 9, 10],
      frequencyDays: 30
    },
    pruning: {
      activeMonths: [3, 4, 5, 6, 7],
      frequencyDays: 45
    },
    repotting: {
      activeMonths: [3, 4],
      frequencyDays: 1095
    },
    substrate: {
      drainage: "HIGH"
    },
    risks: ["indoor", "low_light", "overwatering"],
    translations: {
      es: {
        commonName: "Acebuche",
        scientificName: "Olea europaea var. sylvestris",
        placement: { notes: "Debe mantenerse en exterior con sol directo." },
        temperature: {
          notes: "Tolera calor y heladas ligeras, pero no frío intenso prolongado."
        },
        watering: {
          notes: "Regar cuando el sustrato esté seco en superficie. Evitar encharcamiento."
        },
        fertilizing: {
          notes: "Abonar en primavera y otoño. Reducir en verano y evitar en invierno."
        },
        pruning: {
          notes: "Poda de mantenimiento en crecimiento. Poda fuerte a final de invierno."
        },
        repotting: {
          notes: "Trasplantar en primavera cada 2–4 años."
        },
        substrate: {
          notes: "Sustrato muy drenante para evitar exceso de humedad."
        }
      },
      en: {
        commonName: "Wild olive",
        scientificName: "Olea europaea var. sylvestris",
        placement: { notes: "It should be kept outdoors in direct sun." },
        temperature: {
          notes: "It tolerates heat and light frost, but not prolonged severe cold."
        },
        watering: {
          notes: "Water when the substrate is dry on the surface. Avoid waterlogging."
        },
        fertilizing: {
          notes: "Fertilize in spring and autumn. Reduce in summer and avoid in winter."
        },
        pruning: {
          notes: "Maintenance pruning during growth. Strong pruning at the end of winter."
        },
        repotting: {
          notes: "Repot in spring every 2–4 years."
        },
        substrate: {
          notes: "Use a very free-draining substrate to avoid excess moisture."
        }
      },
      ja: {
        commonName: "アセブチェ",
        scientificName: "Olea europaea var. sylvestris",
        placement: { notes: "屋外で管理し、直射日光をしっかり当てる必要があります。" },
        temperature: {
          notes: "暑さと軽い霜には耐えますが、厳しい寒さが長く続く環境は避けます。"
        },
        watering: {
          notes: "用土の表面が乾いたら水を与えます。過湿は避けてください。"
        },
        fertilizing: {
          notes: "春と秋に施肥し、夏は控えめにし、冬は避けます。"
        },
        pruning: {
          notes: "生育期は維持剪定を行い、強い剪定は冬の終わりに行います。"
        },
        repotting: {
          notes: "春に2年から4年ごとを目安に植え替えます。"
        },
        substrate: {
          notes: "過湿を避けるため、水はけの良い用土が必要です。"
        }
      }
    }
  };
}

export function getSpeciesJsonExampleString() {
  return JSON.stringify(getSpeciesJsonExample(), null, 2);
}

export function parseSpeciesJson(raw: string): SpeciesJsonInput {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("El JSON de especie no es válido.");
  }

  if (!isRecord(parsed)) {
    throw new Error("El JSON de especie debe ser un objeto.");
  }

  const slug = typeof parsed.slug === "string" ? parsed.slug.trim() : "";

  if (!slug) {
    throw new Error("La especie debe incluir un slug.");
  }

  const placement = isRecord(parsed.placement) ? parsed.placement : {};
  const temperature = isRecord(parsed.temperature) ? parsed.temperature : {};
  const watering = isRecord(parsed.watering) ? parsed.watering : {};
  const fertilizing = isRecord(parsed.fertilizing) ? parsed.fertilizing : {};
  const pruning = isRecord(parsed.pruning) ? parsed.pruning : {};
  const repotting = isRecord(parsed.repotting) ? parsed.repotting : {};
  const substrate = isRecord(parsed.substrate) ? parsed.substrate : {};
  const translations = isRecord(parsed.translations) ? parsed.translations : {};

  return {
    slug,
    placement: {
      type:
        typeof placement.type === "string"
          ? (placement.type as SpeciesJsonInput["placement"]["type"])
          : null,
      light:
        typeof placement.light === "string"
          ? (placement.light as SpeciesJsonInput["placement"]["light"])
          : null,
      sunHours: parseNullableNumber(placement.sunHours)
    },
    temperature: {
      min: parseNullableNumber(temperature.min),
      max: parseNullableNumber(temperature.max)
    },
    watering: {
      frequencyDays: parseSeasonalFrequency(watering.frequencyDays)
    },
    fertilizing: {
      activeMonths: parseMonthArray(fertilizing.activeMonths),
      frequencyDays: parseNullableNumber(fertilizing.frequencyDays)
    },
    pruning: {
      activeMonths: parseMonthArray(pruning.activeMonths),
      frequencyDays: parseNullableNumber(pruning.frequencyDays)
    },
    repotting: {
      activeMonths: parseMonthArray(repotting.activeMonths),
      frequencyDays: parseNullableNumber(repotting.frequencyDays)
    },
    substrate: {
      drainage:
        typeof substrate.drainage === "string"
          ? (substrate.drainage as SpeciesJsonInput["substrate"]["drainage"])
          : null
    },
    risks: Array.isArray(parsed.risks)
      ? parsed.risks.filter((item): item is string => typeof item === "string")
      : [],
    translations: {
      es: parseTranslationBlock(translations.es, "es"),
      en: parseTranslationBlock(translations.en, "en"),
      ja: parseTranslationBlock(translations.ja, "ja")
    }
  };
}

export async function upsertSpeciesFromJson(input: SpeciesJsonInput) {
  return prisma.$transaction(async (tx) => {
    const species = await tx.species.upsert({
      where: { slug: input.slug },
      update: {
        placementType: input.placement.type,
        lightExposure: input.placement.light,
        sunHours: input.placement.sunHours,
        minTemperatureC: input.temperature.min,
        maxTemperatureC: input.temperature.max,
        wateringFrequencyDays: input.watering.frequencyDays as unknown as Prisma.InputJsonValue,
        fertilizingActiveMonths: input.fertilizing.activeMonths as unknown as Prisma.InputJsonValue,
        fertilizingFrequencyDays: input.fertilizing.frequencyDays,
        pruningActiveMonths: input.pruning.activeMonths as unknown as Prisma.InputJsonValue,
        pruningFrequencyDays: input.pruning.frequencyDays,
        repottingActiveMonths: input.repotting.activeMonths as unknown as Prisma.InputJsonValue,
        repottingFrequencyDays: input.repotting.frequencyDays,
        substrateDrainage: input.substrate.drainage,
        risks: input.risks as unknown as Prisma.InputJsonValue
      },
      create: {
        slug: input.slug,
        placementType: input.placement.type,
        lightExposure: input.placement.light,
        sunHours: input.placement.sunHours,
        minTemperatureC: input.temperature.min,
        maxTemperatureC: input.temperature.max,
        wateringFrequencyDays: input.watering.frequencyDays as unknown as Prisma.InputJsonValue,
        fertilizingActiveMonths: input.fertilizing.activeMonths as unknown as Prisma.InputJsonValue,
        fertilizingFrequencyDays: input.fertilizing.frequencyDays,
        pruningActiveMonths: input.pruning.activeMonths as unknown as Prisma.InputJsonValue,
        pruningFrequencyDays: input.pruning.frequencyDays,
        repottingActiveMonths: input.repotting.activeMonths as unknown as Prisma.InputJsonValue,
        repottingFrequencyDays: input.repotting.frequencyDays,
        substrateDrainage: input.substrate.drainage,
        risks: input.risks as unknown as Prisma.InputJsonValue
      }
    });

    for (const locale of ["es", "en", "ja"] as const) {
      const translation = input.translations[locale];

      await tx.speciesTranslation.upsert({
        where: {
          speciesId_locale: {
            speciesId: species.id,
            locale
          }
        },
        update: {
          commonName: translation.commonName,
          scientificName: translation.scientificName,
          placementNotes: translation.placement.notes,
          temperatureNotes: translation.temperature.notes,
          wateringNotes: translation.watering.notes,
          fertilizingNotes: translation.fertilizing.notes,
          pruningNotes: translation.pruning.notes,
          repottingNotes: translation.repotting.notes,
          substrateNotes: translation.substrate.notes
        },
        create: {
          speciesId: species.id,
          locale,
          commonName: translation.commonName,
          scientificName: translation.scientificName,
          placementNotes: translation.placement.notes,
          temperatureNotes: translation.temperature.notes,
          wateringNotes: translation.watering.notes,
          fertilizingNotes: translation.fertilizing.notes,
          pruningNotes: translation.pruning.notes,
          repottingNotes: translation.repotting.notes,
          substrateNotes: translation.substrate.notes
        }
      });
    }

    return species;
  });
}

export async function deleteSpeciesBySlug(slug: string) {
  return prisma.species.delete({
    where: { slug }
  });
}

export async function listSpecies(locale: Locale) {
  return prisma.species.findMany({
    orderBy: { slug: "asc" },
    include: {
      translations: {
        where: { locale }
      },
      _count: {
        select: {
          bonsais: true
        }
      }
    }
  });
}

export async function getSpeciesCount() {
  return prisma.species.count();
}

export async function getSpeciesBySlug(slug: string, locale: Locale) {
  return prisma.species.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale }
      }
    }
  });
}

export async function getSpeciesForAdmin(slug: string) {
  return prisma.species.findUnique({
    where: { slug },
    include: {
      translations: {
        orderBy: { locale: "asc" }
      }
    }
  });
}

export function serializeSpeciesToJson(species: SpeciesWithTranslations): string {
  const translationsByLocale = Object.fromEntries(
    species.translations.map((translation) => [
      translation.locale,
      {
        commonName: translation.commonName,
        scientificName: translation.scientificName,
        placement: { notes: translation.placementNotes },
        temperature: { notes: translation.temperatureNotes },
        watering: { notes: translation.wateringNotes },
        fertilizing: { notes: translation.fertilizingNotes },
        pruning: { notes: translation.pruningNotes },
        repotting: { notes: translation.repottingNotes },
        substrate: { notes: translation.substrateNotes }
      }
    ])
  ) as Partial<SpeciesJsonInput["translations"]>;

  const emptyTranslation = {
    commonName: species.slug,
    scientificName: species.slug,
    placement: { notes: null },
    temperature: { notes: null },
    watering: { notes: null },
    fertilizing: { notes: null },
    pruning: { notes: null },
    repotting: { notes: null },
    substrate: { notes: null }
  };

  const payload: SpeciesJsonInput = {
    slug: species.slug,
    placement: {
      type: species.placementType,
      light: species.lightExposure,
      sunHours: species.sunHours
    },
    temperature: {
      min: species.minTemperatureC,
      max: species.maxTemperatureC
    },
    watering: {
      frequencyDays: parseSeasonalFrequency(species.wateringFrequencyDays)
    },
    fertilizing: {
      activeMonths: Array.isArray(species.fertilizingActiveMonths)
        ? (species.fertilizingActiveMonths as number[])
        : [],
      frequencyDays: species.fertilizingFrequencyDays
    },
    pruning: {
      activeMonths: Array.isArray(species.pruningActiveMonths)
        ? (species.pruningActiveMonths as number[])
        : [],
      frequencyDays: species.pruningFrequencyDays
    },
    repotting: {
      activeMonths: Array.isArray(species.repottingActiveMonths)
        ? (species.repottingActiveMonths as number[])
        : [],
      frequencyDays: species.repottingFrequencyDays
    },
    substrate: {
      drainage: species.substrateDrainage
    },
    risks: Array.isArray(species.risks) ? (species.risks as string[]) : [],
    translations: {
      es: translationsByLocale.es ?? emptyTranslation,
      en: translationsByLocale.en ?? emptyTranslation,
      ja: translationsByLocale.ja ?? emptyTranslation
    }
  };

  return JSON.stringify(payload, null, 2);
}

export async function findSpeciesReferenceIdByLabel(label: string) {
  const trimmed = label.trim();

  if (!trimmed) {
    return null;
  }

  const species = await prisma.species.findFirst({
    where: {
      OR: [
        { slug: trimmed.toLowerCase() },
        {
          translations: {
            some: {
              commonName: {
                equals: trimmed,
                mode: "insensitive"
              }
            }
          }
        },
        {
          translations: {
            some: {
              scientificName: {
                equals: trimmed,
                mode: "insensitive"
              }
            }
          }
        }
      ]
    },
    select: { id: true }
  });

  return species?.id ?? null;
}

export async function findSpeciesForDisplay(label: string, locale: Locale) {
  const trimmed = label.trim();

  if (!trimmed) {
    return null;
  }

  return prisma.species.findFirst({
    where: {
      OR: [
        { slug: trimmed.toLowerCase() },
        {
          translations: {
            some: {
              commonName: {
                equals: trimmed,
                mode: "insensitive"
              }
            }
          }
        },
        {
          translations: {
            some: {
              scientificName: {
                equals: trimmed,
                mode: "insensitive"
              }
            }
          }
        }
      ]
    },
    include: {
      translations: {
        where: { locale }
      }
    }
  });
}
