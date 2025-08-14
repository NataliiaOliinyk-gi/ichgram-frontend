import type { FC } from "react";
import { useSelector } from "react-redux";

import defaultAvatar from "../../assets/icons/defaultAvatar.svg";

import { selectAuthUser } from "../../redux/auth/auth-selector";

import type { IUser } from "../../typescript/interfaces";

import styles from "./Messages.module.css";

interface IMessagesProps {
  user: IUser;
}

const Messages: FC<IMessagesProps> = ({ user }) => {
  const currentUser = useSelector(selectAuthUser);

  return (
    <div className={styles.container}>
      <div className={styles.recipientUserAvatarBox}>
        <div className={styles.srfContainer}>
          <div className={styles.avatarBox}>
            <img
              src={user.profilePhoto || defaultAvatar}
              // src={defaultAvatar}
              alt="User avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.usersBox}>
            <p className={styles.usernameText}> {user.username}</p>
            {/* <p className={styles.usernameText}>username</p> */}
          </div>
        </div>
      </div>
      <div className={styles.userProfileBox}>
        <div className={styles.avatarBoxProfile}>
          <img
            src={user.profilePhoto || defaultAvatar}
            // src={defaultAvatar}
            alt="User avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.usersBoxPr}>
          <p className={styles.usernameTextPr}>{user.username}</p>
          <p className={styles.fullNameText}>{user.fullName}</p>
        </div>
        <button className={styles.btn}>View profile</button>
      </div>

      <div className={styles.date}>Jun 26, 2025, 08:49 PM.</div>
      <div className={styles.messagesContainer}>
        <div className={`${styles.userMessages} ${styles.recipientBox}`}>
          <div className={`${styles.avatarUserBox} ${styles.recipientAvatar}`}>
            <img
              src={user.profilePhoto || defaultAvatar}
              alt="User avatar"
              className={styles.avatar}
            />
          </div>
          <div className={`${styles.message} ${styles.messageRecipient}`}>
            <p className={styles.recipientText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className={`${styles.userMessages} ${styles.senderBox}`}>
          <div className={`${styles.message} ${styles.messageSender}`}>
            <p className={styles.senderText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className={`${styles.avatarUserBox} ${styles.senderAvatar}`}>
            <img
              src={currentUser?.profilePhoto || defaultAvatar}
              alt="User avatar"
              className={styles.avatar}
            />
          </div>
        </div>
      </div>
      <div className={styles.addMessegeContainer}>
        <input
          type="text"
          placeholder="Write message"
          className={styles.inputMessage}
        />
      </div>
    </div>
  );
};

export default Messages;
