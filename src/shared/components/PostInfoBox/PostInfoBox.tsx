import type { FC } from "react";

import likeIcon from "../../../assets/icons/like.svg";
import likeRedIcon from "../../../assets/icons/like_red.svg";
import commentIcon from "../../../assets/icons/comment.svg";

import styles from "./PostInfoBox.module.css";

interface IPostInfoBoxProps {
  likesCount: number;
  liked: boolean;
  loading: boolean;
  onToggle: () => void;
}

const PostInfoBox: FC<IPostInfoBoxProps> = ({
  likesCount,
  liked,
  loading,
  onToggle,
}) => {
  return (
    <div className={styles.postInfoBox}>
      <div className={styles.iconsBox}>
        <button
          type="button"
          className={styles.likeBtn}
          onClick={onToggle}
          disabled={loading}
          aria-pressed={liked}
          aria-label={liked ? "Unlike" : "Like"}
        >
          {liked ? (
            <img src={likeRedIcon} alt="like" />
          ) : (
            <img src={likeIcon} alt="like" />
          )}
        </button>
        <img src={commentIcon} alt="comment" />
      </div>
      <div className={styles.infoBox}>
        <div className={styles.infoLikesBox}>
          <p>{likesCount}</p>
          <p>likes</p>
        </div>
      </div>
    </div>
  );
};

export default PostInfoBox;

{
  /* <img src={likeIcon} alt="like" /> */
}
