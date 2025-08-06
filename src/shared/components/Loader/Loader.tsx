import { BeatLoader } from "react-spinners";
import type { FC } from "react";

import styles from "./Loader.module.css";

interface ILoaderProps {
  loading: boolean;
}

const Loader: FC<ILoaderProps> = ({ loading }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderBox}>
        <BeatLoader
          color={"#0095f6"}
          loading={loading}
          cssOverride={{
            borderWidth: "4px",
            display: "block",
            margin: "0 auto",
          }}
          size={15}
          speedMultiplier={0.7}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loader;
