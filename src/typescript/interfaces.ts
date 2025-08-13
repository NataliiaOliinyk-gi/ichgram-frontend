export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  biography?: string;
  profilePhoto?: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
  verify?: boolean;
  followersCount: number;
  followingCount: number;
  isFollowedByCurrentUser?: boolean
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
}

export interface IComment {
   _id: string;
  userId: IUserFromPost;
  postId: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NotificationType = "follow" | "like" | "comment";

export interface IPostFromNote {
  _id: string;
  text: string;
  photo: string;
}

export interface ICommentFromNote {
  _id: string;
  text: string;
}

export interface INotification {
   _id: string;
  recipientId: string; // кому
  senderId: IUserFromPost; // від кого
  type: NotificationType;
  postId?: IPostFromNote;
  commentId?: ICommentFromNote;
  isRead: boolean;
  createdAt: Date;
}