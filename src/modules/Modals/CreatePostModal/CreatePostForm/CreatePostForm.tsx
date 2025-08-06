import type { FC } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type {
  FieldError,
  // UseFormRegister,
  // RegisterOptions,
} from "react-hook-form";

import UploadPhotoBox from "../../../../shared/components/UploadPhotoBox/UploadPhotoBox";

import { selectAuthUser } from "../../../../redux/auth/auth-selector";
import defaultAvatar from "../../../../assets/icons/defaultAvatar.svg";
import smileyIcon from "../../../../assets/icons/smaily.svg";

import type { ICreatePostValues } from "../CreatePostModal";

import styles from "./CreatePostForm.module.css";

interface ICreatePostFormValues {
  text: string;
}

interface ICreatePostFormProps {
  submitForm: (values: ICreatePostValues) => void;
}

const CreatePostForm: FC<ICreatePostFormProps> = ({
  submitForm,
}: ICreatePostFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const currentUser = useSelector(selectAuthUser)!;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreatePostFormValues>();

  const onhandleFileChange = (file: File) => {
    setSelectedFile(file);
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

  const postTextValue = watch("text") || "";
  const characterCount = postTextValue.length;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.titleContainer}>
        <div className={styles.left}></div>
        <h3 className={styles.title}>Create new post</h3>
        <button type="submit" className={styles.btn}>
          Share
        </button>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.uploadBox}>
          <UploadPhotoBox onhandleFileChange={onhandleFileChange} />
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
