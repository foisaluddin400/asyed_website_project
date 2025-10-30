// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.user = action.payload.user || null;
      state.token = action.payload.token;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLoginData, setToken, logout } = authSlice.actions;

export default authSlice.reducer;