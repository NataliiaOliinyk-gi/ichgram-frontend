import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

import defaultAvatar from "../../../../assets/icons/defaultAvatar.svg";

import getTimeAgo from "../../../../shared/utils/getTimeAgo";

import type { INotification } from "../../../../typescript/interfaces";

import styles from "./NotificationItem.module.css";

interface INotificationItemProps {
  note: INotification;
}

const NotificationItem = forwardRef<HTMLLIElement, INotificationItemProps>(
  ({ note }, ref: ForwardedRef<HTMLLIElement>) => {
    const noteDataInfo = getTimeAgo(note.createdAt ?? 0);

    let actionText = "";
    switch (note.type) {
      case "follow":
        actionText = "started following.";
        break;
      case "like":
        actionText = "liked your photo.";
        break;
      case "comment":
        actionText = "commented your photo.";
        break;
      default:
        actionText = "";
        break;
    }

    return (
      <li className={styles.notificationsBox} ref={ref}>
        <div className={styles.ntfContainer}>
          <div className={styles.avatarBox}>
            <img
              src={note.senderId.profilePhoto || defaultAvatar}
              alt="User avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.notifBox}>
            <div className={styles.content}>
              <p>
                <Link
                  to={`/users/${note.senderId._id}`}
                  className={styles.usernameText}
                >
                  <span className={styles.usernameText}>
                    {note.senderId.username}
                  </span>
                </Link>

                <span>{actionText}</span>
              </p>
            </div>
            <p className={styles.infoData}>{noteDataInfo}</p>
          </div>
        </div>
        {note.postId?.photo && (
          <div className={styles.postBox}>
            <img
              src={note.postId?.photo}
              alt="User avatar"
              className={styles.img}
            />
          </div>
        )}
      </li>
    );
  }
);

export default NotificationItem;
