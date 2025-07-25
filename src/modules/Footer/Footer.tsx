import type { FC } from "react";
import { Link } from "react-router-dom";

import menuItems from "../../shared/items/itemsMenu";

import type { IMenuItems } from "../../shared/items/itemsMenu";

import styles from "./Footer.module.css";

const Footer: FC = ()=>{

    const element = menuItems.map(({ id, href, text }: IMenuItems) => (
        <li key={id}>
            <Link to={href} className={styles.link}>{text}</Link>
        </li>
    ))
    return (
        <footer className={styles.wrapper}>
            <div className={styles.container}>
                <ul className={styles.menu}>{element}</ul>
                <div className={styles.divCopyP}>
                    <p className={styles.copyP}>© 2024 ICHgram</p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;