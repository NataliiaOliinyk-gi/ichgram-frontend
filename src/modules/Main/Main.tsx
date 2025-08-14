import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState, useEffect } from "react";

import PostElement from "./PostElement/PostElement";
import Loader from "../../shared/components/Loader/Loader";
import Error from "../../shared/components/Error/Error";

import { getPostsApi } from "../../shared/api/post-api";
import { seedFromFeed } from "../../redux/likes/likes-slise";
import { seedUserFollowState } from "../../redux/follows/follows-slise";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";

import type { IPost } from "../../typescript/interfaces";

import styles from "./Main.module.css";

const Main: FC = () => {
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPostsApi();
        if (data !== undefined) {
          setPosts(data);
          //  лайки
          dispatch(seedFromFeed(data));
          //  фолови
          const seen = new Set<string>();
          data.forEach((post) => {
            const author = post.userId;
            const authorId = author._id as string;
            if (!authorId || seen.has(authorId)) return;
            seen.add(authorId);

            dispatch(
              seedUserFollowState({
                userId: authorId,
                isFollowedByCurrentUser: !!post.isAuthorFollowedByCurrentUser,
                followersCount: author.followersCount ?? 0,
              })
            );
          });
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
    };

    fetchPosts();
  }, [dispatch]);

  const elements = posts.map((item) => (
    <PostElement key={item._id} post={item} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.postsContainer}>{elements}</div>
      {loading && <Loader loading={loading} />}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Main;
