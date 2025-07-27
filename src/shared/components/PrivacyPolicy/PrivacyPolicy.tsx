import type { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy: FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.textPolicy}>
        People who use our service may have uploaded your contact information to
        Instagram{" "}
        <Link to={"/learn-more"} className={styles.link}>
          Learn More
        </Link>
      </p>

      <p className={styles.textPolicy}>
        By signing up, you agree to our{" "}
        <Link to={"/terms"} className={styles.link}>
          Terms
        </Link>
        ,{" "}
        <Link to={"/privacy-policy"} className={styles.link}>
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link to={"/cookies-policy"} className={styles.link}>
          Cookies Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
