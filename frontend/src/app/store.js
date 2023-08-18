import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import usersReducer from "../features/User/userSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
