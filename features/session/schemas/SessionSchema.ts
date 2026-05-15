import z from "zod";

export const SessionSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  date: z.string().trim().min(1, "Date is required"),
  numberOfPlayers: z.number().min(1, "At least one player is required"),
  sessionSummary: z.string().trim().min(1, "Session summary is required"),
  highlights: z.string().optional(),
  improvements: z.string().optional(),
  notes: z.string().optional(),
});

export type SessionSchemaType = z.infer<typeof SessionSchema>;
