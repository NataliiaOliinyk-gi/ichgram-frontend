import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import AuthLink from "../AuthLink/AuthLink";

import styles from "./AuthContentBox.module.css";

interface IAuthContentBoxProps {
  childrenForm: ReactNode;
  showImage?: boolean;
  icon?: React.ReactElement;
  text?: ReactNode;
  textTitle?: string;
  textDescription?: string;
  toLink?: string;
  linkText?: string;
  isOrDevider?: boolean;
  authLinkText?: string;
  authLinkTo?: string;
}

const AuthContentBox: FC<IAuthContentBoxProps> = ({
  childrenForm,
  showImage,
  icon,
  text,
  textTitle,
  textDescription,
  toLink,
  linkText,
  isOrDevider,
  authLinkText,
  authLinkTo,
}) => {
  return (
    <div className={styles.authContentBox}>
      {showImage && (
        <div className={styles.imageContainer}>
          <img src="../../../public/image/ICHGRA_2.png" alt="Ichgram" />
        </div>
      )}

      {icon && <div className={styles.iconContainer}>{icon}</div>}

      {text && (
        <div className={styles.textBox}>
          <p className={styles.text}>{text}</p>
        </div>
      )}

      {textTitle && textDescription && (
        <div className={styles.textDescriptionBox}>
          <p className={styles.textTitle}>{textTitle}</p>
          <p className={styles.textDescription}>{textDescription}</p>
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
        <div className={styles.linkBox}>
          <Link to={toLink} className={styles.link}>
            {linkText}
          </Link>
        </div>
      )}

      {authLinkText && authLinkTo && (
        <>{<AuthLink textLink={authLinkText} toLink={authLinkTo} />}</>
      )}
    </div>
  );
};

export default AuthContentBox;
