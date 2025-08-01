import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import menuItems from "../../../shared/data/itemsMenu";
import defaultAvatar from "../../../assets/icons/defaultAvatar.svg";
import { selectAuthUser } from "../../../redux/auth/auth-selector";

import type { IMenuItems } from "../../../shared/data/itemsMenu";

import styles from "./MainMenu.module.css";

const MainMenu: FC = () => {
  const user = useSelector(selectAuthUser);

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
        to={"/api/me"}
        className={({ isActive }) =>
          `${styles.link} ${styles.profileContainer} ${
            isActive ? styles.active : ""
          }`
        }
      >
        <div className={styles.avatarBorder}>
          <img
            src={user?.profilePhoto || defaultAvatar}
            alt="User avatar"
            className={styles.avatarImage}
          />
        </div>
        <p className={styles.text}>Profile</p>
      </NavLink>
    </ul>
  );
};

export default MainMenu;
