import type { FC } from "react";
import { useSelector } from "react-redux";

import CreatePostModal from "../../../modules/Modals/CreatePostModal/CreatePostModal";
import ViewPostModal from "../../../modules/Modals/ViewPostModal/ViewPostModal";
import EditPostModal from "../../../modules/Modals/EditPostModal/EditPostModal";
import DeletePostModal from "../../../modules/Modals/DeletePostModal/DeletePostModal";

import { closeModal } from "../../../redux/modal/modal-slise";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  selectModalType,
  selectPostData,
} from "../../../redux/modal/modal-selector";

import styles from "./ModalContainer.module.css";

const ModalContainer: FC = () => {
  const modalType = useSelector(selectModalType);
  const postData = useSelector(selectPostData);
  const dispatch = useAppDispatch();

  if (!modalType) return null;

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
    }
  };

  let ModalComponent = null;

  switch (modalType) {
    case "createPost":
      ModalComponent = <CreatePostModal />;
      break;
    case "viewPost":
      ModalComponent = postData ? <ViewPostModal post={postData} /> : null;
      break;
    case "editProfile":
      ModalComponent = <EditPostModal />;
      break;
    case "deletePost":
      ModalComponent = <DeletePostModal />;
      break;
    default:
      ModalComponent = null;
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>{ModalComponent}</div>
    </div>
  );
};

export default ModalContainer;
