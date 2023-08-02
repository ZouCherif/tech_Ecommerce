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
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterNewUserMutation, useLoginUserMutation } = apiSlice;
