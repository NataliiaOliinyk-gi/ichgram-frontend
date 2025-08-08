import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";

import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { closeModal } from "../../../redux/modal/modal-slise";
import { deletePostApi } from "../../../shared/api/post-api";

import type { IPost } from "../../../typescript/interfaces";

import styles from "./DeletePostModal.module.css";

interface IDeleteModalProps {
  post: IPost;
}

const DeletePostModal: FC<IDeleteModalProps> = ({ post }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickDelete = async (postId: string) => {
    try {
      setLoading(true);
      setError(false);

      await deletePostApi(postId);

      dispatch(closeModal());
      dispatch(closeModal());
      navigate("/api/me", { state: { refreshPosts: Date.now() } });
    } catch (error) {
      setError(true);
      const message =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message;
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClickCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>Delete Post?</h3>
        <p className={styles.description}>
          Are you sure you want to delete this post?
        </p>
      </div>

      <ul className={styles.selectBox}>
        <li
          className={`${styles.link} ${styles.danger}`}
          onClick={() => handleClickDelete(post._id)}
        >
          Delete
        </li>
        <li
          className={`${styles.link} ${styles.last}`}
          onClick={() => handleClickCancel()}
        >
          Cancel
        </li>
      </ul>
      {loading && <Loader loading={loading} />}
      {error && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default DeletePostModal;
