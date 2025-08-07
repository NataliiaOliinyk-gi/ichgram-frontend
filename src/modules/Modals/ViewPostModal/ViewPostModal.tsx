import type { FC } from "react";

import defaultAvatar from "../../../assets/icons/defaultAvatar.svg";
import moreIcon from "../../../assets/icons/more.svg";
import smileyIcon from "../../../assets/icons/smaily.svg";
import likeIcon from "../../../assets/icons/like.svg";
import commentIcon from "../../../assets/icons/comment.svg";

import type { IPost } from "../../../typescript/interfaces";

import styles from "./ViewPostModal.module.css";

interface IViewPostProps {
  post: IPost;
}

const ViewPostModal: FC<IViewPostProps> = ({ post }) => {
  console.log(post);

  return (
    <div className={styles.conteiner}>
      {/* photo */}
      <div className={styles.imageContainer}>
        <img src={post.photo} alt="post" className={styles.image} />
      </div>

      <div className={styles.postConteiner}>
        {/* title */}
        <div className={styles.titleBox}>
          <div className={styles.usernameBox}>
            <div className={styles.avatarBox}>
              <img
                src={post.userId.profilePhoto || defaultAvatar}
                alt="User avatar"
                className={styles.avatar}
              />
            </div>
            <p className={styles.username}>{post.userId.username}</p>
          </div>

          <div className={styles.iconBox}>
            <img src={moreIcon} alt="more" />
          </div>
        </div>

        <div className={styles.postDescriptionContainer}>
          {/* post */}
          <div className={styles.postDescriptionBox}>
            <div className={styles.avatarBox}>
              <img
                src={post.userId.profilePhoto || defaultAvatar}
                alt="User avatar"
                className={styles.avatar}
              />
            </div>
            <div className={styles.postBox}>
              <div className={styles.post}>
                <p>
                  <span className={styles.usernameText}>{post.userId.username}</span>
                  <span >{post.text}</span>
                </p>
              </div>
              <p className={styles.infoData}>1 day</p>
            </div>
          </div>

          {/* comments */}
          <div className={styles.commentsBox}></div>
        </div>

        {/* post info */}
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
            <p className={styles.infoData}>1 day</p>
          </div>
        </div>

        {/* add comment */}
        <div className={styles.postFooterBox}>
          <div className={styles.addCommentBox}>
            <div>
              <img src={smileyIcon} alt="smiley icon" />
            </div>
            <input placeholder="Add comment" className={styles.addComment} />
          </div>
          <button type="submit" className={styles.btn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPostModal;
