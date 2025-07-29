import type { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../../modules/Header/Header";
import Footer from "../../../modules/Footer/Footer";

import styles from "./PrivateLayout.module.css";

const PrivateLayout: FC = () => {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.headerContainer}>
          <Header />
          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivateLayout;
