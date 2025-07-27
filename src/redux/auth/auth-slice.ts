import { createSlice } from "@reduxjs/toolkit";

import { login, logout, getCurrent } from "./auth-thunks";
import { pending, rejected } from "../../shared/lib/redux";

import type { IUser } from "../../typescript/interfaces";

export interface IAuthState {
  token: string;
  user: null | IUser;
  loading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  token: "",
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
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
            })
            .addCase(getCurrent.rejected, () => initialState)
            .addCase(logout.pending, pending)
            .addCase(logout.fulfilled, () => initialState)
            .addCase(logout.rejected, rejected)
    }
});

export default authSlice.reducer;
