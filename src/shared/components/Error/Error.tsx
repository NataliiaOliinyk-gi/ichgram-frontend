import type { FC, ReactNode } from "react";

import styles from "./Error.module.css";

interface IErrorProps {
  children: ReactNode;
}

export const Error: FC<IErrorProps> = ({ children }) => {
  return (
    <div className={styles.errorBox}>
      <p className={styles.error}>{children}</p>
    </div>
  );
};

export default Error;
