import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IPost } from "../../typescript/interfaces";

export type ModalType =
  | "createPost"
  | "viewPost"
  | "editProfile"
  | "deletePost"
  | null;

interface IModalState {
  modalType: ModalType;
  postData?: IPost | null;
}

const initialState: IModalState = {
  modalType: null,
  postData: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(store, { payload }: PayloadAction<IModalState["modalType"]>) {
      store.modalType = payload;
    },
    openViewPostModal(store, { payload }: PayloadAction<IPost>) {
      store.modalType = "viewPost";
      store.postData = payload;
    },
    closeModal(store) {
      store.modalType = null;
      store.postData = null;
    },
  },
});

export const { openModal, closeModal, openViewPostModal } = modalSlice.actions;

export default modalSlice.reducer;
