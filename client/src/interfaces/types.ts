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
  content: String;
  createdAt: String;
  comments: String[];
}

//Comment

//CreatePost

export interface ICreatePost {
  content: String;
  files: any | FileList | never[] | null;
}
