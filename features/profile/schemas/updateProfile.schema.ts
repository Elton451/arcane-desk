import { z } from "zod";

export const UpdateProfileSchema = z.object({
  displayName: z.string().min(1).max(100),
});

export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;
