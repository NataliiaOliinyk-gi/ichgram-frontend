import type { FC } from "react";
import type { IPost } from "../../../typescript/interfaces";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "../../../shared/components/Avatar/Avatar";
import PostInfoBox from "../../../shared/components/PostInfoBox/PostInfoBox";
import FollowButton from "../../../shared/components/FollowButton/FollowButton";

import getTimeAgo from "../../../shared/utils/getTimeAgo";

import { toggleOptimistic } from "../../../redux/likes/likes-slise";
import { toggleLike } from "../../../redux/likes/likes-thunks";
import { selectLikeByPostId } from "../../../redux/likes/likes-selector";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { openViewPostModal } from "../../../redux/modal/modal-slise";

import styles from "./PostElement.module.css";

interface IPostElementProps {
  post: IPost;
}

const PostElement: FC<IPostElementProps> = ({ post }) => {
  const like = useSelector(selectLikeByPostId(post._id));
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    // оптимістично
    dispatch(toggleOptimistic({ postId: post._id }));
    // реальний запит
    dispatch(toggleLike({ postId: post._id }));
  };

  const handleClick = (post: IPost) => {
    dispatch(openViewPostModal(post));
  };

  const postDataInfo = getTimeAgo(post.updatedAt ?? 0);
  const isComment: boolean = post.commentsCount > 0;

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

          <FollowButton
            targetId={post.userId._id}
            initialFollowing={false}
            variantWhenFollowing="hidden" // сховати, якщо вже фоловиш
            variantWhenNotFollowing="outline" // показати "Follow"
            width="auto"
          />
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img src={post.photo} alt="photo" className={styles.image} />
      </div>

      <div className={styles.descriptionBox}>
        <div className={styles.postInfoBox}>
          <PostInfoBox
            likesCount={like?.likesCount ?? post.likesCount}
            liked={like?.isLiked ?? !!post.isLikedByCurrentUser}
            loading={!!like?.loading}
            onToggle={handleToggle}
          />
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
        <div
          className={styles.viewComentsBox}
          onClick={() => handleClick(post)}
        >
          {isComment && (
            <p>
              <span>View all comments </span>
              <span>({post.commentsCount})</span>
            </p>
          )}
          {!isComment && (
            <p>
              <span>Add comment </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostElement;
