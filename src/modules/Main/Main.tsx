import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState, useEffect } from "react";

import PostElement from "./PostElement/PostElement";
import Loader from "../../shared/components/Loader/Loader";
import Error from "../../shared/components/Error/Error";

import { getPostsApi } from "../../shared/api/post-api";
import { seedFromFeed } from "../../redux/likes/likes-slise";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";

import type { IPost } from "../../typescript/interfaces";

import styles from "./Main.module.css";

const Main: FC = () => {
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPostsApi();
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
