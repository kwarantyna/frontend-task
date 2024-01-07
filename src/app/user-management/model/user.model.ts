import { StatusEnum } from "./status.enum";

export interface IUser {
  id: number;
  fullName: string;
  role: string | string[];
  status: StatusEnum;
}

export class UserDto implements IUser {
  id!: number;
  fullName!: string;
  role!: string | string[];
  status!: StatusEnum;

  constructor(init?: Partial<UserDto>) {
    Object.assign(this, init);
  }
}
