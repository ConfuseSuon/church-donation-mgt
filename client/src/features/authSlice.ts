import { createSlice } from "@reduxjs/toolkit";

import { authAPI } from "../services/auth";
import { obtainToken } from "../utils/help";

interface ISliceState {
  state: "loading" | "finished";
  accessToken: string;
  loggedInUser: object | null;
}

const initialState: ISliceState = {
  state: "loading",
  accessToken: obtainToken,
  loggedInUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      localStorage.clear();
      state.loggedInUser = null;
      state.accessToken = "";
    },
    handleLoginCredentials: (state, { payload }) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loggedInUser");
      localStorage.setItem("accessToken", payload?.accessToken);
      localStorage.setItem("loggedInUser", JSON.stringify(payload?.data));
      localStorage.setItem("LOGIN_METHOD", "SERVER");
      state.accessToken = payload?.accessToken;
      state.loggedInUser = payload?.data;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     authAPI.endpoints.login.matchFulfilled,
  //     (state, { payload }) => {
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("loggedInUser");
  //       localStorage.setItem("accessToken", payload?.accessToken);
  //       localStorage.setItem("loggedInUser", JSON.stringify(payload?.data));
  //       localStorage.setItem("LOGIN_METHOD", "SERVER");
  //       state.accessToken = payload?.accessToken;
  //       state.loggedInUser = payload?.data;
  //     }
  //   );
  // },
});

export const { handleLogout, handleLoginCredentials } = authSlice.actions;

export default authSlice.reducer;
