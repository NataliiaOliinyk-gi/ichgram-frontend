import { nanoid } from "nanoid";

import type { ModalType } from "../../redux/modal/modal-slise";

export interface ISelectItem {
  id: string;
  text: string;
  action: "modal" | "goBack" | "copyLink";
  modalType?: ModalType;
}

const selectItems: ISelectItem[] = [
  {
    id: nanoid(),
    text: "Delete",
    action: "modal",
    modalType: "deletePost",
  },
  {
    id: nanoid(),
    text: "Edit",
    action: "modal",
    modalType: "editPost",
  },
  {
    id: nanoid(),
    text: "Go to post",
    action: "goBack",
  },
  {
    id: nanoid(),
    text: "Copy link",
    action: "copyLink",
  },
  {
    id: nanoid(),
    text: "Cancel",
    action: "goBack",
  },
];

export default selectItems;