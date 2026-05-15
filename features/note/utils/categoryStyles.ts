import { NoteCategoryValue } from "../types/NoteCategory";

export const CATEGORY_BADGE_CLASSES: Record<NoteCategoryValue, string> = {
  GENERAL: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  PLOT: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  NPC: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  LOCATION: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  ITEM: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  SESSION: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  LORE: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};
