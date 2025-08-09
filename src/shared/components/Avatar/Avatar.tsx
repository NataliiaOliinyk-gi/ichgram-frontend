import type { FC } from "react";

import defaultAvatar from "../../../assets/icons/defaultAvatar.svg";

import styles from "./Avatar.module.css";

interface IAvatarProps {
  profilePhoto?: string;
}

const Avatar: FC<IAvatarProps> = ({ profilePhoto }) => {
  return (
    <div className={styles.avatarBox}>
      <img
        src={profilePhoto || defaultAvatar}
        alt="User avatar"
        className={styles.avatar}
      />
    </div>
  );
};

export default Avatar;
