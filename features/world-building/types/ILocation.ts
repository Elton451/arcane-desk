export interface ILocation {
  id: number;
  name: string;
  type: string;
  population: string | null;
  ruler: string | null;
  description: string | null;
  additionalNotes: string | null;
  createdAt: Date;
  campaignId: number;
}
