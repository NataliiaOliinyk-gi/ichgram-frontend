import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { toggleLikeApi } from "../../shared/api/like-api";

import type { IToggleLike } from "../../typescript/interfaces";

export const toggleLike = createAsyncThunk<
  { postId: string } & IToggleLike, // { liked: boolean; likesCount: number; }, // тип, який повертається
  { postId: string }, // аргументи payload
  { rejectValue: { postId: string; message: string } } // помилка з postId
>("likes/toggle", async ({ postId }, { rejectWithValue }) => {
  try {
    const data = await toggleLikeApi(postId);
    return { postId, ...data };
  } catch (error) {
    const message =
      (error as AxiosError<{ message: string }>).response?.data?.message ||
      (error as AxiosError).message ||
      "Unknown error";
    return rejectWithValue({ postId, message });
  }
});
