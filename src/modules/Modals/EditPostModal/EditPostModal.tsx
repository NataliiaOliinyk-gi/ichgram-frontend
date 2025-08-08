import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreatePostForm from "../CreatePostModal/CreatePostForm/CreatePostForm";
import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";

import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { updatePostApi } from "../../../shared/api/post-api";
import { closeModal } from "../../../redux/modal/modal-slise";

import type { IPost } from "../../../typescript/interfaces";
import type { IUpdatePostFormData } from "../../../shared/api/post-api";
import type { ICreatePostValues } from "../CreatePostModal/CreatePostModal";

import styles from "./EditPostModal.module.css";

interface IEditPostModalProps {
  post: IPost;
}

const EditPostModal: FC<IEditPostModalProps> = ({ post }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmitForm = async (values: ICreatePostValues) => {
    const payload: IUpdatePostFormData = values;

    try {
      setLoading(true);
      setError(false);

      await updatePostApi(post._id, payload);

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

  return (
    <div className={styles.modalContainer}>
      <CreatePostForm isEdit currentPost={post} submitForm={onSubmitForm} />

      {loading && <Loader loading={loading} />}
      {error && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default EditPostModal;
