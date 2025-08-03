import type { RootState } from "../store";

export const selectAuth = (store: RootState) => store.auth;

export const selectAuthUser = (store: RootState) => store.auth.user;

export const selectToken = (store: RootState) => store.auth.token;

export const updateStatus = (store: RootState) => store.auth.updateStatus;