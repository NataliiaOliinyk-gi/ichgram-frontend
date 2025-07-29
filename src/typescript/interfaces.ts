export interface IUser {
  id?: string;
  email: string;
  fullName: string;
  username: string;
  biography?: string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  verified?: boolean;
}
