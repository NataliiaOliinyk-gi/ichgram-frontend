import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState, useEffect, useCallback, useRef } from "react";

import TitlePanel from "../../../shared/components/TitlePanel/TitlePanel";
import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";

import NotificationItem from "./NotificationItem/NotificationItem";

import { getNotificationsApi } from "../../../shared/api/notification-api";

import type { INotification } from "../../../typescript/interfaces";

import styles from "./NotificationsPanel.module.css";

const NotificationsPanel: FC = () => {
  const [notes, setNotes] = useState<INotification[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (pageToLoad: number) => {
    if (loading) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getNotificationsApi(pageToLoad);
      if (data !== undefined) {
        setPage(data.page);
        setHasMore(data.hasMore);
        setNotes((prev) =>
          pageToLoad === 1
            ? data.notifications
            : [...prev, ...data.notifications]
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
  }, []);

  useEffect(() => {
    setNotes([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    fetchNotifications(1);
  }, [fetchNotifications]);

  const observer = useRef<IntersectionObserver | null>(null);

  const onLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    fetchNotifications(page + 1);
  }, [loading, hasMore, fetchNotifications, page]);

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

  const elements = notes.map((item, index) => {
    const isLast = index === notes.length - 1;
    return (
      <NotificationItem
        key={item._id}
        note={item}
        ref={isLast ? lastItemRef : undefined}
      />
    );
  });

  return (
    <div className={styles.panel}>
      <div className={styles.titleBox}>
        <TitlePanel>Notifications</TitlePanel>
        <p className={styles.title}>New</p>
      </div>
      <ul className={styles.notificationsContainer}>{elements}</ul>
      {loading && <Loader loading={loading} />}
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default NotificationsPanel;
