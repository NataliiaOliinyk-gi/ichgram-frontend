import type { FC } from "react";

import Login from "../../modules/Login/Login";

import styles from "./LoginPage.module.css";

const LoginPage: FC = () => {
  return (
    <main>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src="../../public/image/Background.png" alt="Background" />
          </div>
          <Login />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
