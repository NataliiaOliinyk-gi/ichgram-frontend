import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./AuthContentBox.module.css";

interface IAuthContentBoxProps {
  childrenForm: ReactNode;
  showImage?: boolean;
  textTitle?: ReactNode;
  toLink?: string;
  linkText?: string;
  isOrDevider?: boolean;
}

const AuthContentBox: FC<IAuthContentBoxProps> = ({
  childrenForm,
  showImage,
  textTitle,
  toLink,
  linkText,
  isOrDevider,
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

      {childrenForm}

      {isOrDevider && (
        <div className={styles.lineContainer}>
          <div className={styles.line}></div>
          <p className={styles.textOr}>OR</p>
          <div className={styles.line}></div>
        </div>
      )}

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
