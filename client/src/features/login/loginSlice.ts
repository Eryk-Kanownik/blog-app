import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";

export interface LoginState {
  token: String | null;
  userId: String | null;
  username: String | null;
  userProfileImage: string | undefined | any;
  status: "idle" | "loading" | "failed";
}

const initialState: LoginState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  userId: null,
  userProfileImage: undefined,
  username: "Loading...",
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.user._id;
      state.username = action.payload.user.username;
      state.userProfileImage = action.payload.user.userProfileImage;
    },
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.userProfileImage = action.payload.userProfileImage;
    },
    logoutUser: (state, action) => {
      state.token = null;
      state.userId = null;
      state.username = null;
      state.userProfileImage = null;
    },
    changeProfilePicture: (state, action) => {
      state.userProfileImage = action.payload;
    },
  },
});

export const { loginUser, logoutUser, loadUser, changeProfilePicture } =
  loginSlice.actions;

export default loginSlice.reducer;
