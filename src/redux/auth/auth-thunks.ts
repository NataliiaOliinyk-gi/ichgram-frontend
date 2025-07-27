import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginUserApi,
  logoutUserApi,
  getCurrentApi,
} from "../../shared/api/auth-api";
import type { RootState } from "../store";
import type { AxiosError } from "axios";
import type { IUser } from "../../typescript/interfaces";

export const login = createAsyncThunk<
  { token: string; user: IUser }, // тип, який повертається
  { email: string; fullName: string; username: string }, // аргументи payload
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const data = await loginUserApi(payload);
    return data;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message
    );
  }
});

export const getCurrent = createAsyncThunk<
  { token: string; user: IUser }, // тип, який повертається
  { email: string; fullName: string; username: string }, // аргументи payload
  { rejectValue: string; state: RootState }
>("auth/current", async (_, { getState, rejectWithValue }) => {
  try {
    const store = getState();
    const data = await getCurrentApi(store.auth.token);
    return data;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message
    );
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserApi();
      return true;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);
