import type { FC } from "react";
import { Link } from "react-router-dom";

import Button from "../Button/Button";

import linkSvg from "../../../assets/icons/link.svg";
import type { IUser } from "../../../typescript/interfaces";

import styles from "./ProfileInfo.module.css";

interface IProfileInfoProps {
  user: IUser;
  isMe?: boolean;
}

const ProfileInfo: FC<IProfileInfoProps> = ({
  user,
  isMe = false,
}: IProfileInfoProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.avatarBorder}>
        <img
          src={user.profilePhoto}
          alt={`${user.username}'s profile`}
          className={styles.avatarImage}
        />
      </div>

      <div className={styles.profileInfoBox}>
        <div className={styles.titleBox}>
          <p className={styles.title}>{user.username}</p>

          {isMe && (
            <Link to="/api/me/edit-profile">
              <Button text="Edit profile" variant="grey" />
            </Link>
          )}

          {!isMe && (
            <div className={styles.buttonsBox}>
              <Button text={"Follow"} />
              <Button text={"Message"} variant={"grey"} />
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div>
            <span>129</span>
            <p>posts</p>
          </div>
          <div>
            <span>9993</span>
            <p>followers</p>
          </div>
          <div>
            <span>59</span>
            <p>following</p>
          </div>
        </div>

        <div className={styles.biography}>
          <p>{user.biography}</p>
        </div>
        <div className={styles.link}>
          <img src={linkSvg} alt="Link icon" />
          <a href="">bit.ly/3rpiIbh</a>
          <a href="">{user.webseite}</a>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;

// id: string;
// email: string;
// fullName: string;
// username: string;
// biography?: string;
// profilePhoto?: string;
// webseite?: string;
// createdAt?: Date;
// updatedAt?: Date;
// verified?: boolean;
