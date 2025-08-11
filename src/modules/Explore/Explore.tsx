import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState, useEffect } from "react";

import Loader from "../../shared/components/Loader/Loader";
import Error from "../../shared/components/Error/Error";

import { openViewPostModal } from "../../redux/modal/modal-slise";

import { getExplorePostsApi } from "../../shared/api/post-api";
import { seedFromFeed } from "../../redux/likes/likes-slise";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";

import type { IPost } from "../../typescript/interfaces";

import styles from "./Explore.module.css";

const Explore: FC = () => {
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getExplorePostsApi();
        if (data !== undefined) {
          setPosts(data);
          dispatch(seedFromFeed(data));
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

    fetchMyPosts();
  }, [dispatch]);

  const patternClass = (i: number) => {
  const m = i % 10;            
  return (m === 2 || m === 5) ? styles.tall : "";
};

  const handleClick = (post: IPost) => {
    dispatch(openViewPostModal(post));
  };

const elements = posts.map((post, index) => (
  <div
    key={post._id}
    className={`${styles.item} ${patternClass(index)}`}
    onClick={() => handleClick(post)}
  >
    <img src={post.photo} alt="" />
  </div>
));

  return (
    <div className={styles.container}>
      <div className={styles.postsContainer}>{elements}</div>
      {loading && <Loader loading={loading} />}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Explore;

