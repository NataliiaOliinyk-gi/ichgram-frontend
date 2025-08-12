import type { RootState } from "../store";

export const selectModalStack = (store: RootState) => store.modal.modalStack;


// export const selectModalType = (store: RootState) => store.modal.modalType;
// export const selectPostData = (store: RootState) => store.modal.postData;
