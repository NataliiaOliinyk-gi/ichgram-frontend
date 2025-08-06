import type { FC } from "react";
import { useState } from "react";

import Error from "../Error/Error";
import uploadIcon from "../../../../public/image/upload.svg";

import styles from "./UploadPhotoBox.module.css";

interface IUploadPhotoBoxProps {
  onhandleFileChange: (file: File) => void;
  previewClassName?: string;
}

const UploadPhotoBox: FC<IUploadPhotoBoxProps> = ({
  onhandleFileChange,
  previewClassName,
}: IUploadPhotoBoxProps) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");

  // Обробка вибору файлу:
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoError("");
      onhandleFileChange(file);
    } else {
      setPhotoError("Please select a valid image file");
    }
  };

  return (
    <>
      {!photoPreview && (
        <>
          <label htmlFor="photoUpload" className={styles.uploadIconWrapper}>
            <img src={uploadIcon} alt="Upload" className={styles.uploadIcon} />
          </label>
          <input
            id="photoUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.hiddenInput}
          />
        </>
      )}
      {photoPreview && (
        <img src={photoPreview} alt="Preview" className={`${styles.preview} ${previewClassName ? styles[previewClassName] : ""}`} />
      )}
      {photoError && <Error>{photoError}</Error>}
    </>
  );
};

export default UploadPhotoBox;
