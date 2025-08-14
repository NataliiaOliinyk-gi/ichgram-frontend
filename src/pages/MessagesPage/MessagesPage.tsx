import type { FC } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUserByIdApi } from "../../shared/api/user-api";

import type { IUser } from "../../typescript/interfaces";

import Messages from "../../modules/Messages/Messages";
import Wrapper from "../../shared/components/Wrapper/Wrapper";

// import styles from "./MessagesPage.module.css";

const defaultUser: IUser = {
  _id: "default-id",
  email: "",
  fullName: "Full Name",
  username: "defaultUser",
  profilePhoto: "", 
  followersCount: 0,
  followingCount: 0,
};

const MessagesPage: FC = () => {
  const location = useLocation();
  const stateUser = (location.state as { toUser?: IUser } | undefined)?.toUser;

  const [searchParams] = useSearchParams();
  const toId = searchParams.get("to") || undefined;

  const [user, setUser] = useState<IUser | undefined>(stateUser);

  // Фолбек: якщо юзера не передали в state, але є ?to=ID — підвантажити

  useEffect(() => {
    if (!user && toId) {
      (async () => {
        const data = await getUserByIdApi(toId);
        if (data) setUser(data);
      })();
    }
  }, [toId, user]);


  // Якщо нічого не передали — можеш показати “вибери співрозмовника”
  //   if (!user) return <div className={styles.box}>Select a chat to start messaging.</div>;
  return (
    <main>
      <Wrapper>
        <Messages user={user ?? defaultUser} />
      </Wrapper>
    </main>
  );
};

export default MessagesPage;
