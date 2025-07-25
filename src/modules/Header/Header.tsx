import type { FC } from "react";
import MainMenu from "./MainMenu/MainMenu";

import styles from "./Header.module.css";

const Header: FC = ()=>{
    return (
        <header className={styles.headerContainer}>
            <div className={styles.imageContainer}>
                <img src="../../../public/image/ICHGRA_5.png" alt="Ichgram" />
            </div>
            <MainMenu />
        </header>
    )
};

export default Header;