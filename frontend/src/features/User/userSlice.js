import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = usersSlice.actions;

export default usersSlice.reducer;
