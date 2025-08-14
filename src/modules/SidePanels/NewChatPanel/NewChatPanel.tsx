import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import type { AxiosError } from "axios";
import { useState, useEffect } from "react";

import SearchBox from "../../../shared/components/SearchBox/SearchBox";
// import SearchItem from "../../../shared/components/SearchBox/SearchItem/SearchItem";
import ViewUser from "../../../shared/components/ViewUser/ViewUser";

import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";

import { selectAuthUser } from "../../../redux/auth/auth-selector";

import { getUsersApi } from "../../../shared/api/user-api";

import type { IUser } from "../../../typescript/interfaces";

import styles from "./NewChatPanel.module.css";

const NewChatPanel: FC = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuthUser);

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsersApi();
        setUsers(data);
      } catch (err) {
        const message =
          (err as AxiosError<{ message: string }>).response?.data?.message ||
          (err as AxiosError).message ||
          "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleStartChat = (user: IUser) => {
    navigate("/messages", {
      replace: true,
      state: { toUser: user },
    });
  };
  //   const handleStartChat = (user: IUser) => {
  //     navigate(`/messages?to=${user._id}`, { replace: true });
  //   };

  const elements = (users || []).map((item) => (
    <ViewUser key={item._id} user={item} onUserClick={handleStartChat} />
  ));

  return (
    <div className={styles.panel}>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>{currentUser?.username}</h3>
      </div>
      <SearchBox onUserClick={handleStartChat} />

      <ul className={styles.searchContainer}>{elements}</ul>
      {loading && <Loader loading={loading} />}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default NewChatPanel;
