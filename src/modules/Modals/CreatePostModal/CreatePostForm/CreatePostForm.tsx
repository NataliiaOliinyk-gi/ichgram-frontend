import type { FC } from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { FieldError } from "react-hook-form";

import UploadPhotoBox from "../../../../shared/components/UploadPhotoBox/UploadPhotoBox";

import { selectAuthUser } from "../../../../redux/auth/auth-selector";
import { useAppDispatch } from "../../../../shared/hooks/useAppDispatch";
import { closeModal } from "../../../../redux/modal/modal-slise";

import defaultAvatar from "../../../../assets/icons/defaultAvatar.svg";
import smileyIcon from "../../../../assets/icons/smaily.svg";

import type { ICreatePostValues } from "../CreatePostModal";
import type { IPost } from "../../../../typescript/interfaces";

import styles from "./CreatePostForm.module.css";

interface ICreatePostFormValues {
  text: string;
}

interface ICreatePostFormProps {
  submitForm: (values: ICreatePostValues) => void;
  isEdit?: boolean;
  currentPost?: IPost;
}

const CreatePostForm: FC<ICreatePostFormProps> = ({
  submitForm,
  isEdit,
  currentPost,
}: ICreatePostFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const currentUser = useSelector(selectAuthUser)!;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ICreatePostFormValues>({
    defaultValues: {
      text: currentPost?.text || "",
    },
  });

  const onhandleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleClickCancel = () => {
    dispatch(closeModal());
  };

  const onSubmit = (values: ICreatePostFormValues) => {
    const payload: ICreatePostValues = {
      text: "",
      photo: null,
    };
    if (selectedFile) {
      payload.photo = selectedFile;
    }
    payload.text = values.text;

    submitForm(payload);
  };

  useEffect(() => {
    if (isEdit && currentPost) {
      setValue("text", currentPost.text);
    }
  }, [isEdit, currentPost, setValue]);

  const postTextValue = watch("text") || "";
  const characterCount = postTextValue.length;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.titleContainer}>
        <button className={styles.cancelBtn} onClick={() => handleClickCancel()}>
          Cancel
        </button>
        <h3 className={styles.title}>
          {isEdit ? "Edit post" : "Create new post"}
        </h3>
        <button type="submit" className={styles.btn}>
          {isEdit ? "Done" : "Share"}
        </button>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.uploadBox}>
          <UploadPhotoBox
            onhandleFileChange={onhandleFileChange}
            defaultPhotoUrl={
              isEdit && currentPost?.photo ? currentPost.photo : undefined
            }
          />
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.upperContainer}>
            <div className={styles.usernameBox}>
              <div className={styles.avatarBox}>
                <img
                  src={currentUser.profilePhoto || defaultAvatar}
                  alt="User avatar"
                  className={styles.avatar}
                />
              </div>
              <p className={styles.username}>{currentUser.username}</p>
            </div>

            <div className={styles.inputBox}>
              <textarea
                {...register("text", {
                  maxLength: {
                    value: 2200,
                    message: "About must be less than 2200 characters",
                  },
                })}
                maxLength={2220}
                className={styles.textarea}
              />
              <div className={styles.counter}>{characterCount}/2200</div>
              {errors.text && (
                <p className={styles.textFieldError}>
                  {(errors.text as FieldError).message}
                </p>
              )}
            </div>
            <div>
              <img src={smileyIcon} alt="smiley icon" />
            </div>
          </div>

          <div className={styles.lowerContainer}></div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
