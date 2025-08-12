import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerApi,
  verifyUserApi,
  loginUserApi,
  getCurrentApi,
  resendVerificationEmailApi,
  forgotPasswordApi,
  logoutUserApi,
} from "../../shared/api/auth-api";

import type { AxiosError } from "axios";
import type { RootState } from "../store";
import type {
  IRegisterPayload,
  ILoginPayload,
  IAuthResponse,
  IResendVerificationEmaiPayload,
  IForgotPasswordPayload,
} from "../../shared/api/auth-api";

import { updateMyProfileApi } from "../../shared/api/myProfile-api";
import type { IUpdateMyProfilePayload } from "../../shared/api/myProfile-api";
import type { IUser } from "../../typescript/interfaces";

export const register = createAsyncThunk<
  { message: string }, // що повертається
  IRegisterPayload, // аргументи, які передаються
  { rejectValue: string } // кастомна помилка
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const data = await registerApi(payload);
    return data;
  } catch (error) {
    const message =
      (error as AxiosError<{ message: string }>).response?.data?.message ||
      (error as AxiosError).message;

    return rejectWithValue(message);
  }
});

export const verify = createAsyncThunk<
  { message: string },
  { code: string },
  { rejectValue: string }
>("auth/verify", async ({ code }, { rejectWithValue }) => {
  try {
    const data = await verifyUserApi(code);
    return data;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message
    );
  }
});

export const login = createAsyncThunk<
  IAuthResponse, // { token: string; user: IUser }, // тип, який повертається
  ILoginPayload, // { email: string; password: string }, // аргументи payload
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
  IAuthResponse, // { token: string; user: IUser }, // тип, який повертається
  void,
  { rejectValue: string; state: RootState }
>("auth/current", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const data = await getCurrentApi(token);
    return data;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message
    );
  }
});

export const resendVerificationEmail = createAsyncThunk<
  { message: string },
  IResendVerificationEmaiPayload,
  { rejectValue: string }
>("auth/resend-verify-email", async (payload, { rejectWithValue }) => {
  try {
    const data = await resendVerificationEmailApi(payload);
    return data;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message
    );
  }
});

export const forgotPassword = createAsyncThunk<
  { message: string },
  IForgotPasswordPayload,
  { rejectValue: string }
>("auth/forgot-password", async (payload, { rejectWithValue }) => {
  try {
    const data = await forgotPasswordApi(payload);
    return data;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message
    );
  }
});

export const logout = createAsyncThunk<
  boolean, // повертає true
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutUserApi();
    return true;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message
    );
  }
});

export const updateMyProfile = createAsyncThunk<
  IUser, // { user: IUser }, // тип, який повертається
  IUpdateMyProfilePayload, // аргументи payload
  // { username: string; fullName: string; biography?: string; website?: string; profilePhoto?: string;},
  { rejectValue: string }
>("auth/updateMyProfile", async (payload, { rejectWithValue }) => {
  try {
    const data = await updateMyProfileApi(payload);
    return data;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message
    );
  }
});
