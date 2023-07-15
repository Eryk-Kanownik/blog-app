import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import loginReducer from "../features/login/loginSlice";
import messageReducer from "../features/message/messageSlice";
import userReducer from "../features/user/userSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    message: messageReducer,
    user: userReducer,
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
