import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
  reducers: {
    login: (state, action) => {
      const token = action.payload.token;
      state.accessToken = token;
      state.isAuthenticated = true;

      localStorage.setItem("accessToken", token);
    },

    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
