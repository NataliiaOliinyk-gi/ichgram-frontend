import type { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./AuthFooter.module.css";

interface IAuthFooterProps {
  text: string;
  linkText: string;
  toLink: string;
}

const AuthFooter: FC<IAuthFooterProps> = ({
  text,
  linkText,
  toLink,
}: IAuthFooterProps) => {
  return (
    <div className={styles.authFooterContainer}>
      <p className={styles.text}>{text}</p>
      <Link to={toLink} className={styles.link}>
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooter;
