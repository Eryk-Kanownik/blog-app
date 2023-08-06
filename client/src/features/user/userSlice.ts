import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { IPost } from "../../interfaces/types";

export interface UserState {
  userId: String | null;
  username: String | null;
  userProfileImage: any;
  userPosts: any;
  userComments: any;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  userId: null,
  username: null,
  userProfileImage: null,
  userPosts: [],
  userComments: [],
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserData: (state, action) => {
      state.userId = action.payload.user._id;
      state.username = action.payload.user.username;
      state.userProfileImage = action.payload.user.userProfileImage;
      state.userPosts = action.payload.posts;
      state.userComments = action.payload.comments;
    },
    changePostInUserPosts: (state, action) => {
      state.userPosts[
        state.userPosts
          .map((post: IPost) => post._id)
          .indexOf(action.payload._id)
      ] = action.payload;
    },
    updatePostsForUser: (state, action) => {
      state.userPosts = action.payload.filter(
        (post: IPost) => post.userId === state.userId
      );
    },
  },
});

export const { loadUserData, changePostInUserPosts, updatePostsForUser } =
  userSlice.actions;

export default userSlice.reducer;
