import z from "zod";

export const NpcSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().min(1, "Role is required"),
  description: z.string().trim().min(1, "Description is required"),
  personality: z.string().optional(),
});

export type NpcSchemaType = z.infer<typeof NpcSchema>;
