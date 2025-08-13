import type { FC, ChangeEvent } from "react";
import type { AxiosError } from "axios";
import { useState, useEffect, useCallback, useRef } from "react";

import TitlePanel from "../../../shared/components/TitlePanel/TitlePanel";
import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";
import SearchItem from "./SearchItem/SearchItem";
import ClearIcon from "../../../assets/icons/clearIcon.svg";

import { searchUsersApi } from "../../../shared/api/user-api";

import type { IUser } from "../../../typescript/interfaces";

import styles from "./SearchPanel.module.css";

const limit = 10;

const SearchPanel: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(
    async (pageToLoad: number) => {
      if (!q.trim()) {
        setUsers([]);
        setPage(1);
        setHasMore(false);
        return;
      }
      if (loading) return;
      try {
        setLoading(true);
        setError(null);
        const data = await searchUsersApi(q, pageToLoad, limit);
        if (data !== undefined) {
          setPage(data.page);
          setHasMore(data.hasMore);
          setUsers((prev) =>
            pageToLoad === 1 ? data.users : [...prev, ...data.users]
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
    [q]
  );

  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    fetchUsers(1);
  }, [q, fetchUsers]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQ(event.target.value);
  };
  const observer = useRef<IntersectionObserver | null>(null);

  const onLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    fetchUsers(page + 1);
  }, [loading, hasMore, fetchUsers, page]);

  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) onLoadMore();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  const elements = users.map((item, index) => {
    const isLast = index === users.length - 1;
    return (
      <SearchItem
        key={item._id}
        user={item}
        ref={isLast ? lastItemRef : undefined}
      />
    );
  });

  return (
    <div className={styles.panel}>
      <div className={styles.titleBox}>
        <TitlePanel>Search</TitlePanel>
      </div>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search"
          value={q}
          onChange={onChange}
          className={styles.searchInput}
        />
        <div className={styles.imgBox}>
          <img src={ClearIcon} alt="ClearIcon" />
        </div>
      </div>
      {users && (
        <div className={styles.contentBox}>
          <p className={styles.title}>Recent</p>
        </div>
      )}

      <ul className={styles.searchContainer}>{elements}</ul>
      {loading && <Loader loading={loading} />}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default SearchPanel;
