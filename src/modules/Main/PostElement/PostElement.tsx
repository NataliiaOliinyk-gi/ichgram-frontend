import type { FC } from "react";
import type { IPost } from "../../../typescript/interfaces";
import { Link } from "react-router-dom";

import Avatar from "../../../shared/components/Avatar/Avatar";
import PostInfoBox from "../../../shared/components/PostInfoBox/PostInfoBox";

import getTimeAgo from "../../../shared/utils/getTimeAgo";

import styles from "./PostElement.module.css";

interface IPostElementProps {
  post: IPost;
}

const PostElement: FC<IPostElementProps> = ({ post }) => {
  const postDataInfo = getTimeAgo(post.updatedAt ?? 0);

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <Avatar profilePhoto={post.userId.profilePhoto} />
        <div className={styles.titleDescription}>
          <Link to={`/users/${post.userId._id}`} className={styles.link}>
            <p className={styles.username}>{post.userId.username}</p>
          </Link>
          <span className={styles.grey}> • </span>
          <p className={styles.grey}>{postDataInfo}</p>
          <span className={styles.grey}> • </span>
          {/* если не подписан, то подписаться - доставить условие!!!! */}
          <button className={styles.btn}>follow</button>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img src={post.photo} alt="photo" className={styles.image} />
      </div>

      <div className={styles.descriptionBox}>
        <div className={styles.postInfoBox}>
          <PostInfoBox />
        </div>
        <div className={styles.postBox}>
          <div className={styles.post}>
            <p>
              <span className={styles.usernameText}>
                {post.userId.username}
              </span>
              <span>{post.text}</span>
            </p>
          </div>
        </div>
        <div className={styles.viewComentsBox}>
          <p>
            <span>View all comments </span>
            <span>(732)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostElement;
