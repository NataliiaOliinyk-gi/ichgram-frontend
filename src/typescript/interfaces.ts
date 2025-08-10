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

export interface IUserFromPost {
  _id: string;
  fullName: string;
  username: string;
  profilePhoto?: string;
}

export interface IPost {
  _id: string;
  userId: IUserFromPost;
  text: string;
  photo: string;
  likesCount: number;
  commentsCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  isLikedByCurrentUser: boolean;
}

export interface IToggleLike { 
    liked: boolean; 
    likesCount: number;
};