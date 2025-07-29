import type { FC, ReactNode } from "react";

import styles from "./SuccessMessage.module.css";

interface ISuccessMessageProps {
  children: ReactNode;
}

export const SuccessMessage: FC<ISuccessMessageProps> = ({ children }) => {
  return (
    <div className={styles.successMessageBox}>
      <p className={styles.successMessage}>{children}</p>
    </div>
  );
};

export default SuccessMessage;