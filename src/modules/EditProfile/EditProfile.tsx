import type { FC } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "../../shared/components/Button/Button";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import Loader from "../../shared/components/Loader/Loader";
import Error from "../../shared/components/Error/Error";
import SuccessMessage from "../../shared/components/SuccessMessage/SuccessMessage";

import defaultAvatar from "../../assets/icons/defaultAvatar.svg";

import {
  selectAuthUser,
  selectAuth,
  updateStatus,
} from "../../redux/auth/auth-selector";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { updateMyProfile } from "../../redux/auth/auth-thunks";
import type { IUpdateMyProfilePayload } from "../../shared/api/myProfile-api";
import type { IEditProfileFormValues } from "./EditProfileForm/EditProfileForm";

import styles from "./EditProfile.module.css";

const EditProfile: FC = () => {
  const currentUser = useSelector(selectAuthUser)!;
  const dispatch = useAppDispatch();

  const updateProfileStatus = useSelector(updateStatus);

  const [successEdit, setSuccessEdit] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loading, error } = useSelector(selectAuth);

  const [showPhotoUploader, setShowPhotoUploader] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    if (updateProfileStatus === "success") {
      setSuccessEdit(true);
      setSuccessMessage("Update Successfully");
    }
  }, [updateProfileStatus]);

  const onSubmitForm = async (values: IEditProfileFormValues) => {
    setErrorMessage("");
    const payload: IUpdateMyProfilePayload = {
      username: values.username,
      fullName: values.fullName,
      website: values.website?.trim() ?? "",
      biography: values.biography?.trim() ?? "",
      // profilePhoto: defaultUser.profilePhoto,
    };

    try {
      const data = await dispatch(updateMyProfile(payload));
      if (data !== undefined) {
        // setSuccessEdit(true);
        // setSuccessMessage("Update Successfully");
      }
    } catch (error) {
      if (typeof error === "string") {
        setErrorMessage(error);
      }
    }
  };

  // Обробка вибору файлу:
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoError("");
    } else {
      setPhotoError("Please select a valid image file");
    }
  };

  // Завантаження на сервер:
  const handlePhotoUpload = async () => {
    if (!selectedFile) return;

    setUploadingPhoto(true);
    setPhotoError("");
    try {
      await dispatch(updateMyProfile({ profilePhoto: selectedFile }));

      setShowPhotoUploader(false);
      setSelectedFile(null);
      setPhotoPreview(null);
    } catch (error) {
      // setPhotoError("Upload failed. Please try again.");
      if (typeof error === "string") {
        setPhotoError(error);
      }
    } finally {
      setUploadingPhoto(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titlePage}>Edit profile</h2>
      <div className={styles.profileBlock}>
        <div className={styles.box}>
          <div className={styles.avatarBox}>
            <img
              src={currentUser.profilePhoto || defaultAvatar}
              alt="User avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.profileDescription}>
            <p className={styles.username}>{currentUser.username}</p>
            <p className={styles.fullName}>{currentUser.fullName}</p>
          </div>
        </div>

        <div className={styles.btnBox}>
          {/* <Button text="New photo" /> */}
          <Button
            text="New photo"
            onClick={() => setShowPhotoUploader((prev) => !prev)}
          />
        </div>
      </div>

      {/* Компонент завантаження фото: */}

      {showPhotoUploader && (
        <div className={styles.uploadBox}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {photoPreview && (
            <img src={photoPreview} alt="Preview" className={styles.preview} />
          )}
          {photoError && <Error>{photoError}</Error>}
          <div className={styles.uploadBtnBox}>
            <Button
              text="Save Photo"
              onClick={handlePhotoUpload}
              disabled={uploadingPhoto}
            />
          </div>
        </div>
      )}

      <EditProfileForm
        textBtn="Save"
        submitForm={onSubmitForm}
        fieldsToRender={["username", "fullName", "website", "biography"]}
        user={currentUser!}
        errorMessage={errorMessage}
        // onFieldError={handleFieldError}
      />

      {successEdit && <SuccessMessage>{successMessage}</SuccessMessage>}
      {loading && <Loader loading={loading} />}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default EditProfile;

// const handleFieldError = (
//   field: keyof IEditProfileFormValues,
//   message: string
// ) => {
//   // можна використати для логів або додаткової обробки
//   console.log("Field error", field, message);
// };
