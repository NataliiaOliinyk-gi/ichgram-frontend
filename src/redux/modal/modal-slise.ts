import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IPost } from "../../typescript/interfaces";

export type ModalType =
  | "createPost"
  | "viewPost"
  | "editSelection"
  | "editPost"
  | "deletePost"
  | null;

interface IModalStackItem {
  modalType: ModalType;
  postData?: IPost | null;
}

interface IModalState {
  modalStack: IModalStackItem[];
}

const initialState: IModalState = {
  modalStack: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(store, { payload }: PayloadAction<ModalType>) {
      store.modalStack.push({ modalType: payload });
    },
    openViewPostModal(store, { payload }: PayloadAction<IPost>) {
      store.modalStack.push({ modalType: "viewPost", postData: payload });
    },
    openEditSelectionModal(
      store,
      { payload }: PayloadAction<{ type: ModalType; postData: IPost }>
    ) {
      store.modalStack.push({
        modalType: payload.type,
        postData: payload.postData,
      });
    },
    openEditPostModal(store, { payload }: PayloadAction<IPost>) {
      store.modalStack.push({ modalType: "editPost", postData: payload });
    },
    openDeletePostModal(store, { payload }: PayloadAction<IPost>) {
      store.modalStack.push({ modalType: "deletePost", postData: payload });
    },
    closeModal(store) {
      store.modalStack.pop(); // Закриває лише верхню модалку
    },
  },
});

export const {
  openModal,
  closeModal,
  openViewPostModal,
  openEditSelectionModal,
  openEditPostModal,
  openDeletePostModal,
} = modalSlice.actions;

export default modalSlice.reducer;
