import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";

export interface MessageState {
  state: Number;
  message: String;
  status: "idle" | "loading" | "failed";
}

const initialState: MessageState = {
  state: 1,
  message: "Hello",
  status: "idle",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    serverMessage: (state, action) => {
      state.state = action.payload.state;
      state.message = action.payload.message;
    },
  },
});

export const { serverMessage } = messageSlice.actions;

export default messageSlice.reducer;
