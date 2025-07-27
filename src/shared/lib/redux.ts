import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState } from "../../redux/auth/auth-slice";

export const pending = (store: Draft<IAuthState>) => {
  store.loading = true;
  store.error = null;
};

export const rejected = (
  store: Draft<IAuthState>,
  action: PayloadAction<unknown>
) => {
  store.loading = false;

  if (typeof action.payload === "string" || action.payload === undefined) {
    store.error = action.payload ?? null;
  } else {
    store.error = "An unknown error occurred."; // або null
  }
};
