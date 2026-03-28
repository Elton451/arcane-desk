import "server-only";
import { Dictionary, Lang } from "@shared/types/i18n";

const dictionaries: Record<Lang, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/enUS.json").then((module) => module.default),
  "pt-BR": () =>
    import("./dictionaries/ptBR.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
