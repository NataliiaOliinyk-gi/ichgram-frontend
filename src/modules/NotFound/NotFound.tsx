import type { FC } from "react";

import styles from "./NotFound.module.css";

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="../../public/image/Background.png"
          alt="Background"
        />
      </div>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Oops! Page Not Found (404 Error)</h2>
        <p className={styles.content}>
          We're sorry, but the page you're looking for doesn't seem to exist.{" "}
          <br /> If you typed the URL manually, please double-check the
          spelling. <br /> If you clicked on a link, it may be outdated or
          broken.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
