import { IUserDTO } from "./IUser";

export interface ICampaign {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  system?: string;
  ownerId: string;
  owner: IUserDTO;
}
