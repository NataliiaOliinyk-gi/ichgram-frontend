export interface IUser {
  id: string;
  email: string;
  fullName: string;
  username: string;
  biography?: string;
  profilePhoto?: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
  verified?: boolean;
}

export interface IPost {
  id: string;
  userId: IUser;
  text: string;
  photo: string;
  createdAt?: Date;
  updatedAt?: Date;
}
