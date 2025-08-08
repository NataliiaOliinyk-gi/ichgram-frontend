import type { FC } from "react";
import { Link } from "react-router-dom";

import menuItems from "../../shared/data/itemsMenu";

import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { openModal } from "../../redux/modal/modal-slise";

import type { IMenuItems } from "../../shared/data/itemsMenu";
import type { ModalType } from "../../redux/modal/modal-slise";

import styles from "./Footer.module.css";

const Footer: FC = () => {
  const dispatch = useAppDispatch();

  const handleModalClick = (event: React.MouseEvent, type: ModalType) => {
    event.preventDefault();
    dispatch(openModal(type));
  };

  const element = menuItems.map((item: IMenuItems) => {
    const isModal = item.type === "modal";
    return (
      <li key={item.id}>
        <Link
          to={item.href}
          className={styles.link}
          onClick={
            isModal
              ? (event) => handleModalClick(event, item.modalType!)
              : undefined
          }
        >
          {item.text}
        </Link>
      </li>
    );
  });
  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.menu}>{element}</ul>
        <div className={styles.divCopyP}>
          <p className={styles.copyP}>© 2025 ICHgram</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
