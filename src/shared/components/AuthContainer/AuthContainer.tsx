import type { FC, ReactNode } from "react";

import styles from "./AuthContainer.module.css";

interface IAuthContainerProps {
  children: ReactNode;
}

const AuthContainer: FC<IAuthContainerProps> = ({ children })=>{
    return (
        <div className={styles.container}>{children}</div>
    )
};

export default AuthContainer;