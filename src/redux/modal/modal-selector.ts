import type { RootState } from "../store";

export const selectModalType = (store: RootState) => store.modal.modalType;
