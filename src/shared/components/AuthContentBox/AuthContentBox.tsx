import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./AuthContentBox.module.css";

interface IAuthContentBoxProps {
  children: ReactNode;
  showImage?: boolean;
  textTitle?: string;
  toLink?: string;
  linkText?: string;
}

const AuthContentBox: FC<IAuthContentBoxProps> = ({
  children,
  showImage,
  textTitle,
  toLink,
  linkText,
}) => {
  return (
    <div className={styles.authContentBox}>
      {showImage && (
        <div className={styles.imageContainer}>
          <img src="../../../public/image/ICHGRA_2.png" alt="Ichgram" />
        </div>
      )}

      {textTitle && (
        <div className={styles.textTitleBox}>
          <p className={styles.textTitle}>{textTitle}</p>
        </div>
      )}

      {children}

      <div className={styles.lineContainer}>
        <div className={styles.line}></div>
        <p className={styles.textOr}>OR</p>
        <div className={styles.line}></div>
      </div>

      {toLink && (
        <div>
          <Link to={toLink} className={styles.link}>
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthContentBox;
