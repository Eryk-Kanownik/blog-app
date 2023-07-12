import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";

export interface UserState {
  userId: String | null;
  username: String | null;
  userPosts: any;
  userComments: any;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  userId: null,
  username: null,
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
      state.userPosts = action.payload.posts;
    },
  },
});

export const { loadUserData } = userSlice.actions;

export default userSlice.reducer;