import type { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./AuthLink.module.css";

export interface IAuthLinkProps {
  textLink: string;
  toLink: string;
}

const AuthLink: FC<IAuthLinkProps> = ({ textLink, toLink }) => {
  return (
    <Link to={toLink} className={styles.link}>
      {textLink}
    </Link>
  );
};

export default AuthLink;
