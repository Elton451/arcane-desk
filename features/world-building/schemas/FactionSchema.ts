import z from "zod";

export const FactionSchema = z.object({
  name: z.string().trim().min(1),
  type: z.string().trim().min(1),
  leader: z.string().optional(),
  goals: z.string().optional(),
  description: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type FactionSchemaType = z.infer<typeof FactionSchema>;
