import likeIcon from "../../../assets/icons/like.svg";
import commentIcon from "../../../assets/icons/comment.svg";

import styles from "./PostInfoBox.module.css";

const PostInfoBox = () => {
  return (
    <div className={styles.postInfoBox}>
      <div className={styles.iconsBox}>
        <img src={likeIcon} alt="like" />
        <img src={commentIcon} alt="comment" />
      </div>
      <div className={styles.infoBox}>
        <div className={styles.infoLikesBox}>
          <p>25</p>
          <p>likes</p>
        </div>
      </div>
    </div>
  );
};

export default PostInfoBox;
