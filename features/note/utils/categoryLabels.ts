import { Dictionary } from "@/shared/types/i18n";
import { NoteCategoryValue } from "../types/NoteCategory";

export type CategoryLabelKey = keyof Dictionary["note"]["categories"];

export const categoryLabelKey = (
  category: NoteCategoryValue,
): CategoryLabelKey => category.toLowerCase() as CategoryLabelKey;

export const getCategoryLabel = (
  dict: Dictionary,
  category: NoteCategoryValue,
): string => dict.note.categories[categoryLabelKey(category)];
