import type { FC } from "react";

import selectItems from "../../../shared/data/selectItems";

import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import {
  openEditPostModal,
  openDeletePostModal,
  closeModal,
} from "../../../redux/modal/modal-slise";

import type { IPost } from "../../../typescript/interfaces";
import type { ISelectItem } from "../../../shared/data/selectItems";

import styles from "./EditSelectionModal.module.css";

// const selectItems = ["Delete", "Edit", "Go to post", "Copy link", "Cancel"];

interface IEditSelectionModalProps {
  post: IPost;
}

const EditSelectionModal: FC<IEditSelectionModalProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handleClick = async (item: ISelectItem) => {
    switch (item.action) {
      case "modal":
        dispatch(closeModal());
        if (item.modalType === "editPost") dispatch(openEditPostModal(post));
        if (item.modalType === "deletePost")
          dispatch(openDeletePostModal(post));
        break;

      case "goBack":
        dispatch(closeModal());
        break;

      case "copyLink":
        try {
          const postId = post._id;
          const link = `${window.location.origin}/posts/${postId}`;
          await navigator.clipboard.writeText(link);
          alert("Link copied to clipboard!");
          dispatch(closeModal());
        } catch (error) {
          alert(`Failed to copy link, ${error}`);
        }
        break;

      default:
        break;
    }
  };

  const elements = selectItems.map((item, index) => (
    <li
      key={item.id}
      className={`${styles.link} ${
        item.text === "Delete" ? styles.danger : ""
      } ${index === 0 ? styles.first : ""} ${
        index === selectItems.length - 1 ? styles.last : ""
      }`}
      onClick={() => handleClick(item)}
    >
      {item.text}
    </li>
  ));

  return (
    <div className={styles.modalContainer}>
      <ul className={styles.selectBox}>{elements}</ul>
    </div>
  );
};

export default EditSelectionModal;
