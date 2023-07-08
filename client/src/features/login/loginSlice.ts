import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { stat } from "fs";
import axios from "axios";

export interface LoginState {
  token: String | null;
  status: "idle" | "loading" | "failed";
}

const initialState: LoginState = {
  token: localStorage.getItem("token"),
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { loginUser } = loginSlice.actions;

export default loginSlice.reducer;
