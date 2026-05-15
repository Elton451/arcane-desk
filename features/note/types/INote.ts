import { NoteCategoryValue } from "./NoteCategory";

export interface INote {
  id: number;
  title: string;
  content: string;
  category: NoteCategoryValue;
  date: Date;
  createdAt: Date;
  campaignId: number;
}
