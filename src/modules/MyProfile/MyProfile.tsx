import type { FC } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { AxiosError } from "axios";

import ProfileInfo from "../../shared/components/ProfileInfo/ProfileInfo";
import PostsInProfile from "../../shared/components/PostsInProfile/PostsInProfile";
import Loader from "../../shared/components/Loader/Loader";
import Error from "../../shared/components/Error/Error";

import { getMyProfileApi } from "../../shared/api/myProfile-api";
import { getMyPostsApi } from "../../shared/api/post-api";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { seedFromFeed } from "../../redux/likes/likes-slise";

import type { IUser, IPost } from "../../typescript/interfaces";

import styles from "./MyProfile.module.css";

const initialUser: IUser = {
  _id: "",
  email: "",
  fullName: "",
  username: "",
  followersCount: 0,
  followingCount: 0,
};

const MyProfile: FC = () => {
  const location = useLocation();
  const shouldRefreshPosts = location.state?.refreshPosts;

  const dispatch = useAppDispatch();

  const [user, setUser] = useState<IUser>(initialUser);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyProfileInfo = async () => {
      try {
        setLoadingUser(true);
        setErrorUser(null);
        const data = await getMyProfileApi();
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

    fetchMyProfileInfo();
  }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoadingPosts(true);
        setErrorPosts(null);
        const data = await getMyPostsApi();
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

    fetchMyPosts();
  }, [shouldRefreshPosts, dispatch]);

  return (
    <div className={styles.container}>
      {user && <ProfileInfo isMe user={user} posts={posts} />}

      {loadingUser && <Loader loading={loadingUser} />}
      {errorUser && <Error>{errorUser}</Error>}

      <PostsInProfile posts={posts} />

      {loadingPosts && <Loader loading={loadingPosts} />}
      {errorPosts && <Error>{errorPosts}</Error>}
    </div>
  );
};

export default MyProfile;
