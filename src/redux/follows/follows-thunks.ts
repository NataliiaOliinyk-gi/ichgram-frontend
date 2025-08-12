import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { followUserApi, unfollowUserApi } from "../../shared/api/follow-api";

import type {
  IFollowStatusResponce,
} from "../../shared/api/follow-api";

export interface IFollowUserPayload { targetId: string }

export const followUser = createAsyncThunk<
  IFollowStatusResponce, // тип, який повертається
  IFollowUserPayload, // аргумент payload
  { rejectValue: string } // помилка
>("follows/followUser", async ({ targetId }, { rejectWithValue }) => {
  try {
    const data = await followUserApi(targetId);
    return data;
  } catch (error) {
    const message =
      (error as AxiosError<{ message: string }>).response?.data?.message ||
      (error as AxiosError).message ||
      "Unknown error";
    return rejectWithValue(message);
  }
});

export const unfollowUser = createAsyncThunk<
  IFollowStatusResponce, // тип, який повертається
  IFollowUserPayload, // аргумент payload
  { rejectValue: string } // помилка
>("follows/unfollowUser", async ({ targetId }, { rejectWithValue }) => {
  try {
    const data = await unfollowUserApi(targetId);
    return data;
  } catch (error) {
    const message =
      (error as AxiosError<{ message: string }>).response?.data?.message ||
      (error as AxiosError).message ||
      "Unknown error";
    return rejectWithValue(message);
  }
});
