
import MainMenu from "./MainMenu/MainMenu";

import styles from "./Header.module.css";

const Header = ()=>{
    return (
        <header className={styles.headerContainer}>
            <div className={styles.imageContainer}>
                <img src="../../../public/image/ICHGRA.png" alt="Ichgram" />
            </div>
            <MainMenu />
        </header>
    )
};

export default Header;