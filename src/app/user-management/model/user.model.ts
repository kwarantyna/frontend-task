export interface IUser {
  id: number;
  fullName: string;
  role: string;
}

export class UserDto implements IUser {
  id!: number;
  fullName!: string;
  role!: string;

  constructor(init?: Partial<UserDto>) {
    Object.assign(this, init);
  }
}
