import type { ForwardedRef } from "react";
import { forwardRef } from "react";

import Avatar from "../../Avatar/Avatar";
import likeIcon from "../../../../assets/icons/like.svg";
// import likeRedIcon from "../../../../assets/icons/like_red.svg";

import getTimeAgo from "../../../utils/getTimeAgo";

import type { IComment } from "../../../../typescript/interfaces";

import styles from "./Comment.module.css";

interface ICommentProps {
  comment: IComment;
}

const Comment = forwardRef<HTMLLIElement, ICommentProps>(
  ({ comment }, ref: ForwardedRef<HTMLLIElement>) => {
    const commentDataInfo = getTimeAgo(comment.updatedAt ?? 0);

    return (
      <li className={styles.commentContainer} ref={ref}>
        <Avatar profilePhoto={comment.userId.profilePhoto} />
        <div className={styles.commentBox}>
          <div className={styles.comment}>
            <p>
              <span className={styles.usernameText}>
                {comment.userId.username}
              </span>
              <span>{comment.text}</span>
            </p>
          </div>
          <div className={styles.infoBox}>
            <p className={styles.infoData}>{commentDataInfo}</p>
            <div className={styles.infoLikesBox}>
              <p>Likes:</p>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className={styles.iconsBox}>
          <button
            type="button"
            className={styles.likeBtn}
            // onClick={onToggle}
            // disabled={loading}
          >
            <img src={likeIcon} alt="like" className={styles.icon} />
            {/* {liked ? (
            <img src={likeRedIcon} alt="like" />
          ) : (
            <img src={likeIcon} alt="like" />
          )} */}
          </button>
        </div>
      </li>
    );
  }
);

export default Comment;
