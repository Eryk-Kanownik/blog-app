//Login
export interface IUserLoginData {
  email: String;
  password: String;
}

//Register
export interface IUserRegisterData {
  username: String;
  email: String;
  password: String;
}

//Post
export interface IPost {
  _id: String;
  username: String;
  userId: String;
  userProfileImage: string | null;
  content: String;
  createdAt: String;
  comments: String[];
  likes: String[];
}

//Comment

export interface IComment {
  userCommentedName: string;
  userCommentedId: string;
  userCommentedProfileImage: string;
  commentContent: String;
}

//Like
export interface ILike {
  _id: String;
  userLikedId: String;
}

//CreatePost

export interface ICreatePost {
  content: String;
  files: File | any;
}
