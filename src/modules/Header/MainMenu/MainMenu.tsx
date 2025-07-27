import type { FC } from "react";
import { NavLink } from "react-router-dom";

import menuItems from "../../../shared/data/itemsMenu";

import type { IMenuItems } from "../../../shared/data/itemsMenu";

import styles from "./MainMenu.module.css";

const MainMenu: FC = () => {
  const element = menuItems.map((item: IMenuItems) => (
    <li key={item.id}>
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
      >
        {({ isActive }) => {
          const Icon = isActive ? item.iconActive : item.icon;
          return (
            <>
              <Icon className={styles.icon} />
              <p>{item.text}</p>
            </>
          );
        }}
      </NavLink>
    </li>
  ));

  return (
    <ul className={styles.menu}>
      {element}
      <NavLink
        to={"/api/users/me"}
        className={({ isActive }) =>
          `${styles.link} ${styles.profileContainer} ${
            isActive ? styles.active : ""
          }`
        }
      >
        <span>Icon</span>
        <p className={styles.text}>Profile</p>
      </NavLink>
    </ul>
  );
};

export default MainMenu;
