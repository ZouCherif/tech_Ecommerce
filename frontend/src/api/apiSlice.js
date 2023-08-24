import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserInfo, clearUserInfo } from "../features/User/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data?.accessToken) {
      api.dispatch(
        setUserInfo({ accessToken: refreshResult.data.accessToken })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
        api.dispatch(clearUserInfo());
        // window.location.href = "/auth";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
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
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/resetPassword/${token}`,
        method: "POST",
        body: { password },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    getCategories: builder.query({
      query: () => "/categories",
    }),
    addNewCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
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
  useResetPasswordMutation,

  useGetCategoriesQuery,
  useAddNewCategoryMutation,
} = apiSlice;
