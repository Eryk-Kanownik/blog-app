import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";

export interface LoginState {
  token: String | null;
  userId: String | null;
  username: String | null;
  status: "idle" | "loading" | "failed";
}

const initialState: LoginState = {
  token: localStorage.getItem("token"),
  userId: null,
  username: "Loading...",
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.userId = action.payload.user._id;
      state.username = action.payload.user.username;
    },
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    logoutUser: (state, action) => {
      state.token = null;
      state.userId = null;
      state.username = null;
    },
  },
});

export const { loginUser, logoutUser, loadUser } = loginSlice.actions;

export default loginSlice.reducer;
