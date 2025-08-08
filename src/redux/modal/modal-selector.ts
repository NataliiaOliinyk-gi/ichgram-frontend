import type { RootState } from "../store";

export const selectModalStack = (state: RootState) => state.modal.modalStack;


// export const selectModalType = (store: RootState) => store.modal.modalType;
// export const selectPostData = (store: RootState) => store.modal.postData;
