import { createSlice } from "@reduxjs/toolkit";

import {
  register,
  verify,
  login,
  logout,
  getCurrent,
  resendVerificationEmail,
  forgotPassword,
  updateMyProfile,
} from "./auth-thunks";
import { pending, rejected } from "../../shared/lib/redux";

import type { IUser } from "../../typescript/interfaces";

export interface IAuthState {
  token: string;
  user: null | IUser;
  loading: boolean;
  error: string | null;
  updateStatus: "idle" | "pending" | "success" | "error";
}

const initialState: IAuthState = {
  token: "",
  user: null,
  loading: false,
  error: null,
  updateStatus: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, pending)
      .addCase(register.fulfilled, (store) => {
        store.loading = false;
      })
      .addCase(register.rejected, rejected)

      .addCase(verify.pending, pending)
      .addCase(verify.fulfilled, (store) => {
        store.loading = false;
      })
      .addCase(verify.rejected, rejected)

      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.token = payload.token;
        store.user = payload.user;
      })
      .addCase(login.rejected, rejected)

      .addCase(getCurrent.pending, pending)
      .addCase(getCurrent.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.token = payload.token;
        store.user = payload.user;
        store.updateStatus = "idle";
      })
      .addCase(getCurrent.rejected, () => initialState)

      .addCase(resendVerificationEmail.pending, pending)
      .addCase(resendVerificationEmail.fulfilled, (store) => {
        store.loading = false;
      })
      .addCase(resendVerificationEmail.rejected, rejected)

      .addCase(forgotPassword.pending, pending)
      .addCase(forgotPassword.fulfilled, (store) => {
        store.loading = false;
      })
      .addCase(forgotPassword.rejected, rejected)

      .addCase(logout.pending, pending)
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, rejected)

      .addCase(updateMyProfile.pending, (store) => {
        store.loading = true;
        store.error = null;
        store.updateStatus = "pending";
      })
      .addCase(updateMyProfile.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.user = payload;
        store.updateStatus = "success";
      })
      .addCase(updateMyProfile.rejected, (store, action) => {
        store.loading = false; 
        if (
          typeof action.payload === "string" ||
          action.payload === undefined
        ) {
          store.error = action.payload ?? null;
        } else {
          store.error = "An unknown error occurred.";
        }
        store.updateStatus = "error";
      });
  },
});

export default authSlice.reducer;
