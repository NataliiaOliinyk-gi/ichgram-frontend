import type { FC } from "react";
import type { AxiosError } from "axios";
import { useState, useEffect } from "react";

import TitlePanel from "../../../shared/components/TitlePanel/TitlePanel";
import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";

import NotificationItem from "./NotificationItem/NotificationItem";

import { getNotificationsApi } from "../../../shared/api/notification-api";

import type { INotification } from "../../../typescript/interfaces";

import styles from "./NotificationsPanel.module.css";

const NotificationsPanel: FC = () => {
  const [notes, setNotes] = useState<INotification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNotificationsApi();
        if (data !== undefined) {
          setNotes(data);
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

    fetchNotifications();
  }, []);

  const elements = notes.map((item) => (
    <NotificationItem key={item._id} note={item} />
  ));

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
