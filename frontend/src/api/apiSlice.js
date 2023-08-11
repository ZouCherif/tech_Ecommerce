import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    registerNewUser: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    googleAuth: builder.mutation({
      query: (credentials) => ({
        url: "/auth/google",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    RefreshToken: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "GET",
        credentials: "include",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgotpassword",
        method: "POST",
        body: email,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterNewUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useGoogleAuthMutation,
  useRefreshTokenMutation,
  useLogoutUserMutation,
} = apiSlice;
