import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/auth/authSlice";
import goalSlice from "./goal/goalSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    goals: goalSlice,
  },
});
