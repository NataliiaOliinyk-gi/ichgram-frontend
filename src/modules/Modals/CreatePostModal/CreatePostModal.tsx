import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreatePostForm from "./CreatePostForm/CreatePostForm";
import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";

import { addPostApi } from "../../../shared/api/post-api";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { closeModal } from "../../../redux/modal/modal-slise";

import type { IAddPostPayload } from "../../../shared/api/post-api";

import styles from "./CreatePostModal.module.css";

export interface ICreatePostValues {
  text: string;
  photo: File | null;
}

const CreatePostModal: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmitForm = async (values: ICreatePostValues) => {
    const payload: IAddPostPayload = values;

    try {
      setLoading(true);
      setError(false);

      await addPostApi(payload);

      dispatch(closeModal());
      navigate("/api/me", { state: { refreshPosts: true } });
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
      <CreatePostForm submitForm={onSubmitForm} />
      {loading && <Loader loading={loading} />}
      {error && <Error>{errorMessage}</Error>}
    </div>
  );
};

export default CreatePostModal;
