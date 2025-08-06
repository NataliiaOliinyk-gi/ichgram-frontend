import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "createPost" | "editProfile" | "deletePost" | null;

interface IModalState {
  modalType: ModalType;
}

const initialState: IModalState = {
  modalType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(store, { payload }: PayloadAction<IModalState["modalType"]>) {
      store.modalType = payload;
    },
    closeModal(store) {
      store.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
