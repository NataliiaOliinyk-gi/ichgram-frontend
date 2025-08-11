import type { FC } from "react";
import type { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";

import Avatar from "../../../shared/components/Avatar/Avatar";
import PostInfoBox from "../../../shared/components/PostInfoBox/PostInfoBox";
import CommentsBox from "../../../shared/components/CommenstBox/CommentsBox";
import AddCommentBox from "../../../shared/components/AddCommentBox/AddCommentBox";
import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";

import moreIcon from "../../../assets/icons/more.svg";
import getTimeAgo from "../../../shared/utils/getTimeAgo";

import { selectLikeByPostId } from "../../../redux/likes/likes-selector";
import { toggleOptimistic } from "../../../redux/likes/likes-slise";
import { toggleLike } from "../../../redux/likes/likes-thunks";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { openEditSelectionModal } from "../../../redux/modal/modal-slise";
import {
  getCommentsByPostIdApi,
  addCommentApi,
} from "../../../shared/api/comment-api";

import type { IPost, IComment } from "../../../typescript/interfaces";
import type { ModalType } from "../../../redux/modal/modal-slise";
import type { IAddCommentPayload } from "../../../shared/api/comment-api";

import styles from "./ViewPostModal.module.css";

interface IViewPostProps {
  post: IPost;
}

const ViewPostModal: FC<IViewPostProps> = ({ post }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // const [comment, setComment] = useState<IComment>();
  const [loadingAddComment, setLoadingAddComment] = useState<boolean>(false);
  const [errorAddComment, setErrorAddComment] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const like = useSelector(selectLikeByPostId(post._id));

  const fetchComments = useCallback(
    async (pageToLoad: number) => {
      if (loading) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getCommentsByPostIdApi(post._id, pageToLoad);
        if (data !== undefined) {
          setPage(data.page);
          setHasMore(data.hasMore);
          setComments((prev) =>
            pageToLoad === 1 ? data.comments : [...prev, ...data.comments]
          );
        }
      } catch (error) {
        const message =
          (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message ||
          "Unbekannter Fehler";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [post._id]
  );

  // перший запит + ресет при зміні поста
  useEffect(() => {
    setComments([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    fetchComments(1);
  }, [post._id, fetchComments]);

  const handleModalClick = (event: React.MouseEvent, type: ModalType) => {
    event.preventDefault();
    dispatch(openEditSelectionModal({ type, postData: post }));
  };

  const handleToggle = () => {
    dispatch(toggleOptimistic({ postId: post._id }));
    dispatch(toggleLike({ postId: post._id }));
  };

  const submitForm = async (payload: IAddCommentPayload) => {
    try {
      setLoadingAddComment(true);
      setErrorAddComment(null);
      const data = await addCommentApi(post._id, payload);
      if (data !== undefined) {
        // setComment(data)
        setComments((prev) => [data, ...prev]); // додаємо новий коментар на початок
      }
    } catch (error) {
      const message =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        (error as AxiosError).message ||
        "Unbekannter Fehler";
      setErrorAddComment(message);
    } finally {
      setLoadingAddComment(false);
    }
  };

  const postDataInfo = getTimeAgo(post.updatedAt ?? 0);

  return (
    <div className={styles.conteiner}>
      {error && <Error>{error}</Error>}

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

          <div className={styles.commentsBox}>
            <CommentsBox
              comments={comments}
              hasMore={hasMore}
              loading={loading}
              onLoadMore={() => fetchComments(page + 1)}
            />
            {loading && comments.length === 0 && <Loader loading={true} />}
          </div>
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

        <div className={styles.addCommentBox}>
          <AddCommentBox submitForm={submitForm} />
          {loadingAddComment && <Loader loading={true} />}
          {errorAddComment && <Error>{error}</Error>}
        </div>
      </div>
    </div>
  );
};

export default ViewPostModal;
