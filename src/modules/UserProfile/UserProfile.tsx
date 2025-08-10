import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProfileInfo from "../../shared/components/ProfileInfo/ProfileInfo";
import PostsInProfile from "../../shared/components/PostsInProfile/PostsInProfile";
import Loader from "../../shared/components/Loader/Loader";
import Error from "../../shared/components/Error/Error";

import { getUserByIdApi } from "../../shared/api/user-api";
import { getPostsByUserApi } from "../../shared/api/post-api";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { seedFromFeed } from "../../redux/likes/likes-slise";

import type { IUser, IPost } from "../../typescript/interfaces";

import styles from "./UserProfile.module.css";

const initialUser: IUser = {
  id: "",
  email: "",
  fullName: "",
  username: "",
};

const UserProfile: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<IUser>(initialUser);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProfileInfo = async () => {
      try {
        setLoadingUser(true);
        setErrorUser(null);
        const data = await getUserByIdApi(id);
        if (data !== undefined) {
          setUser(data);
        }
      } catch (error) {
        const message =
          (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message ||
          "Unbekannter Fehler";
        setErrorUser(message);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchProfileInfo();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        setErrorPosts(null);
        const data = await getPostsByUserApi(id);
        if (data !== undefined) {
          setPosts(data);
          dispatch(seedFromFeed(data));
        }
      } catch (error) {
        const message =
          (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message ||
          "Unbekannter Fehler";
        setErrorPosts(message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [id, dispatch]);

  return (
    <div className={styles.container}>
      {user && <ProfileInfo user={user} />}

      {loadingUser && <Loader loading={loadingUser} />}
      {errorUser && <Error>{errorUser}</Error>}

      <PostsInProfile posts={posts} />

      {loadingPosts && <Loader loading={loadingPosts} />}
      {errorPosts && <Error>{errorPosts}</Error>}
    </div>
  );
};

export default UserProfile;
