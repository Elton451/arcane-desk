import z from "zod";

export const LocationSchema = z.object({
  name: z.string().trim().min(1),
  type: z.string().trim().min(1),
  population: z.string().optional(),
  ruler: z.string().optional(),
  description: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type LocationSchemaType = z.infer<typeof LocationSchema>;
