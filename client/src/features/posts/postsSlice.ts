import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces/types";
import { stat } from "fs";

export interface PostsState {
  posts: IPost[];
  status: "idle" | "loading" | "failed";
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadPosts: (state, action) => {
      state.posts = action.payload;
    },
    likePost: (state, action) => {
      state.posts[
        state.posts.map((post) => post._id).indexOf(action.payload._id)
      ] = action.payload;
    },
    addComment: (state, action) => {
      state.posts[
        state.posts.map((post) => post._id).indexOf(action.payload._id)
      ] = action.payload;
    },
  },
});

export const { loadPosts, likePost, addComment } = postsSlice.actions;

export default postsSlice.reducer;
