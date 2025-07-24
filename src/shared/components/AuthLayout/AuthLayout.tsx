import type { FC, ReactNode } from "react";

import styles from "./AuthLayout.module.css";

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default AuthLayout;
