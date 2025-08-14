import type { FC } from "react";

import defaultAvatar from "../../../assets/icons/defaultAvatar.svg";

import type { IUser } from "../../../typescript/interfaces";

import styles from "./ViewUser.module.css";

interface IViewUserProps {
  user: IUser;
  onUserClick: (user: IUser) => void;
}

const ViewUser: FC<IViewUserProps> = ({ user, onUserClick }) => {
  return (
    <li className={styles.searchBox}>
      <div className={styles.srfContainer}>
        <div className={styles.avatarBox}>
          <img
            src={user.profilePhoto || defaultAvatar}
            alt="User avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.usersBox}>
          <button
            type="button"
            className={styles.rowBtn}
            onClick={() => onUserClick(user)}
          >
            {user.username}
          </button>
          <p className={styles.fullNameText}>{user.fullName}</p>
        </div>
      </div>
    </li>
  );
};

export default ViewUser;
