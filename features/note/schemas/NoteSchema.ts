import z from "zod";
import { NOTE_CATEGORIES } from "../types/NoteCategory";

export const NoteSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  category: z.enum(NOTE_CATEGORIES),
});

export type NoteSchemaType = z.infer<typeof NoteSchema>;
