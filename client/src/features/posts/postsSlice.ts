import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces/types";
import { stat } from "fs";
import axios from "axios";

export interface PostsState {
  posts: IPost[];
  status: "idle" | "loading" | "failed";
}

const initialState: PostsState = {
  posts: [],
  status: "loading",
};

export const loadPosts = createAsyncThunk("posts/loadPosts", async (posts) => {
  let res = await axios.get("http://localhost:5000/posts");
  return res.data.body;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { likePost, addComment } = postsSlice.actions;

export default postsSlice.reducer;
