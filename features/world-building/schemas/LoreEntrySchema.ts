import z from "zod";

export const LoreEntrySchema = z.object({
  name: z.string().trim().min(1),
  type: z.string().trim().min(1),
  era: z.string().optional(),
  source: z.string().optional(),
  description: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type LoreEntrySchemaType = z.infer<typeof LoreEntrySchema>;
