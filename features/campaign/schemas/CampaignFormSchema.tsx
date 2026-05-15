import { z } from "zod";

export const CampaignFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type CampaignFormType = z.infer<typeof CampaignFormSchema>;
