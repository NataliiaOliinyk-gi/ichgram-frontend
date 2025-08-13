import type { FC } from "react";
import MainMenu from "./MainMenu/MainMenu";

import Logo from "/image/ICHGRA_5.png";

import styles from "./Header.module.css";

const Header: FC = ()=>{
    return (
        <header className={styles.headerContainer}>
            <div className={styles.imageContainer}>
                <img src={Logo} alt="Ichgram" />
            </div>
            <MainMenu />
        </header>
    )
};

export default Header;