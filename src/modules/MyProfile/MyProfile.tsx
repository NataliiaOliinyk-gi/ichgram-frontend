import type { FC } from "react";
import { useState, useEffect } from "react";
import type { AxiosError } from "axios";

import ProfileInfo from "../../shared/components/ProfileInfo/ProfileInfo";
import ProfileTape from "../../shared/components/ProfileTape/ProfileTape";
import Loader from "../../shared/components/Loader/Loader";
import Error from "../../shared/components/Error/Error";

// import useFetch from "../../shared/hooks/useFetch";
import { getMyProfileApi } from "../../shared/api/myProfile-api";

import type { IUser } from "../../typescript/interfaces";

import styles from "./MyProfile.module.css";

const initialUser: IUser = {
  id: "",
  email: "",
  fullName: "",
  username: "",
};

const MyProfile: FC = () => {
  const [user, setUser] = useState<IUser>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMyProfileApi();
        if (data !== undefined) {
          setUser(data);
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

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {user && <ProfileInfo isMe user={user} />}

      <ProfileTape />

      {loading && <Loader loading={loading} />}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default MyProfile;

