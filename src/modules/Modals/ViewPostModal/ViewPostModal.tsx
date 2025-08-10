import type { FC } from "react";
import { useSelector } from "react-redux";

import Avatar from "../../../shared/components/Avatar/Avatar";
import PostInfoBox from "../../../shared/components/PostInfoBox/PostInfoBox";

import moreIcon from "../../../assets/icons/more.svg";
import smileyIcon from "../../../assets/icons/smaily.svg";
import getTimeAgo from "../../../shared/utils/getTimeAgo";

import { selectLikeByPostId } from "../../../redux/likes/likes-selector";
import { toggleOptimistic } from "../../../redux/likes/likes-slise";
import { toggleLike } from "../../../redux/likes/likes-thunks";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { openEditSelectionModal } from "../../../redux/modal/modal-slise";

import type { IPost } from "../../../typescript/interfaces";
import type { ModalType } from "../../../redux/modal/modal-slise";

import styles from "./ViewPostModal.module.css";

interface IViewPostProps {
  post: IPost;
}

const ViewPostModal: FC<IViewPostProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const like = useSelector(selectLikeByPostId(post._id));

  const handleModalClick = (event: React.MouseEvent, type: ModalType) => {
    event.preventDefault();
    dispatch(openEditSelectionModal({ type, postData: post }));
  };

    const handleToggle = () => {
      dispatch(toggleOptimistic({ postId: post._id }));
      dispatch(toggleLike({ postId: post._id }));
    };
  

   const postDataInfo = getTimeAgo(post.updatedAt ?? 0);

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
            <Avatar profilePhoto={post.userId.profilePhoto} />
            <p className={styles.username}>{post.userId.username}</p>
          </div>

          <button
            className={styles.iconBtnBox}
            onClick={(event) => handleModalClick(event, "editSelection")}
          >
            <img src={moreIcon} alt="more" />
          </button>
        </div>

        <div className={styles.postDescriptionContainer}>
          {/* post */}
          <div className={styles.postDescriptionBox}>
            <Avatar profilePhoto={post.userId.profilePhoto} />
            <div className={styles.postBox}>
              <div className={styles.post}>
                <p>
                  <span className={styles.usernameText}>
                    {post.userId.username}
                  </span>
                  <span>{post.text}</span>
                </p>
              </div>
              <p className={styles.infoData}>{postDataInfo}</p>
            </div>
          </div>

          {/* comments */}
          <div className={styles.commentsBox}></div>
        </div>

        {/* post info */}

        <div className={styles.postInfoBox}>
          <PostInfoBox
            likesCount={like?.likesCount ?? post.likesCount}
            liked={like?.isLiked ?? !!post.isLikedByCurrentUser}
            loading={!!like?.loading}
            onToggle={handleToggle}
          />
          <div className={styles.infoBox}>
            <p className={styles.infoData}>{postDataInfo}</p>
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
