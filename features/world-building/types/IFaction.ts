export interface IFaction {
  id: number;
  name: string;
  type: string;
  leader: string | null;
  goals: string | null;
  description: string | null;
  additionalNotes: string | null;
  createdAt: Date;
  campaignId: number;
}
