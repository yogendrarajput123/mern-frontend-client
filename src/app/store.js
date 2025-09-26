import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../features/userDetailSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    app: userDetailReducer,
    auth: authReducer,
  },
});
