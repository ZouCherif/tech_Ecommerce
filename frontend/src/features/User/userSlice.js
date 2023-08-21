import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: { token: null },
  reducers: {
    setUserInfo: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    clearUserInfo: (state) => {
      state.token = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = usersSlice.actions;

export default usersSlice.reducer;
