import { NoteCategory as PrismaNoteCategory } from "@/prisma/generated/prisma/client";

export const NOTE_CATEGORIES = [
  "GENERAL",
  "PLOT",
  "NPC",
  "LOCATION",
  "ITEM",
  "SESSION",
  "LORE",
] as const satisfies readonly PrismaNoteCategory[];

export type NoteCategoryValue = (typeof NOTE_CATEGORIES)[number];

export const DEFAULT_NOTE_CATEGORY: NoteCategoryValue = "GENERAL";

export type NoteFilterValue = NoteCategoryValue | "ALL";
