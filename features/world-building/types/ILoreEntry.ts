export interface ILoreEntry {
  id: number;
  name: string;
  type: string;
  era: string | null;
  source: string | null;
  description: string | null;
  additionalNotes: string | null;
  createdAt: Date;
  campaignId: number;
}
