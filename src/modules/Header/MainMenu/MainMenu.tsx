import type { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import menuItems from "../../../shared/data/itemsMenu";
import defaultAvatar from "../../../assets/icons/defaultAvatar.svg";
import { selectAuthUser } from "../../../redux/auth/auth-selector";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { openModal } from "../../../redux/modal/modal-slise";

import type { IMenuItems } from "../../../shared/data/itemsMenu";
import type { ModalType } from "../../../redux/modal/modal-slise";

import styles from "./MainMenu.module.css";

const MainMenu: FC = () => {
  const user = useSelector(selectAuthUser);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleModalClick = (event: React.MouseEvent, type: ModalType) => {
    event.preventDefault();
    dispatch(openModal(type));
  };

  const element = menuItems.map((item: IMenuItems) => {
    const isModal = item.type === "modal";
    const isMessages = item.href === "/messages";
    const to = item.href;
    // const state = item.openAsPanel
    //   ? { backgroundLocation: location }
    //   : undefined;
    const state = isMessages
      ? { showPanel: "messages" } // панель поверх самої /messages
      : item.openAsPanel
      ? { backgroundLocation: location } // звичайна панель (search/notifications)
      : undefined;

    return (
      <li key={item.id}>
        <NavLink
          // to={item.href}
          to={to}
          state={state}
          onClick={
            isModal
              ? (event) => handleModalClick(event, item.modalType!)
              : undefined
          }
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          {({ isActive }) => {
            const Icon = isActive ? item.iconActive : item.icon;
            return (
              <>
                <Icon className={styles.icon} />
                <p>{item.text}</p>
              </>
            );
          }}
        </NavLink>
      </li>
    );
  });

  return (
    <ul className={styles.menu}>
      {element}
      <NavLink
        to={"/api/me"}
        className={({ isActive }) =>
          `${styles.link} ${styles.profileContainer} ${
            isActive ? styles.active : ""
          }`
        }
      >
        <div className={styles.avatarBorder}>
          <img
            src={user?.profilePhoto || defaultAvatar}
            alt="User avatar"
            className={styles.avatarImage}
          />
        </div>
        <p className={styles.text}>Profile</p>
      </NavLink>
    </ul>
  );
};

export default MainMenu;

// const handleModalClick = (href: string) => {
//   navigate(href, { state: { backgroundLocation: location } });
// };

// const element = menuItems.map((item: IMenuItems) => {
//   const isModal = item.type === "modal";

//   return (
//     <li key={item.id}>
//       {isModal ? (
//         <button
//           className={styles.link}
//           onClick={() => handleModalClick(item.href)}
//         >
//           <item.icon className={styles.icon} />
//           <p>{item.text}</p>
//         </button>
//       ) : (
//         <NavLink
//           to={item.href}
//           className={({ isActive }) =>
//             `${styles.link} ${isActive ? styles.active : ""}`
//           }
//         >
//           {({ isActive }) => {
//             const Icon = isActive ? item.iconActive : item.icon;
//             return (
//               <>
//                 <Icon className={styles.icon} />
//                 <p>{item.text}</p>
//               </>
//             );
//           }}
//         </NavLink>
//       )}
//     </li>
//   );
// });

//////////////////

// const handleCreateClick = () => {
//   navigate("/api/me/create-post", {
//     state: { backgroundLocation: location },
//   });
// };

// що було до зміни для модального вікна, робочий варіант самого початку простого меню

//   const MainMenu: FC = () => {
//   const user = useSelector(selectAuthUser);

//   const element = menuItems.map((item: IMenuItems) => (
//     <li key={item.id}>
//       <NavLink
//         to={item.href}
//         className={({ isActive }) =>
//           `${styles.link} ${isActive ? styles.active : ""}`
//         }
//       >
//         {({ isActive }) => {
//           const Icon = isActive ? item.iconActive : item.icon;
//           return (
//             <>
//               <Icon className={styles.icon} />
//               <p>{item.text}</p>
//             </>
//           );
//         }}
//       </NavLink>
//     </li>
//   ));

//   return (
//     <ul className={styles.menu}>
//       {element}
//       <NavLink
//         to={"/api/me"}
//         className={({ isActive }) =>
//           `${styles.link} ${styles.profileContainer} ${
//             isActive ? styles.active : ""
//           }`
//         }
//       >
//         <div className={styles.avatarBorder}>
//           <img
//             src={user?.profilePhoto || defaultAvatar}
//             alt="User avatar"
//             className={styles.avatarImage}
//           />
//         </div>
//         <p className={styles.text}>Profile</p>
//       </NavLink>
//     </ul>
//   );
// };

// export default MainMenu;

//////////////////
// віріант для useLocation (але не зрозуміло, як працює, бо поки не вийшло)
//
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
//
// const MainMenu: FC = () => {
//   const user = useSelector(selectAuthUser);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleModalClick = (e: React.MouseEvent, href: string) => {
//     e.preventDefault(); // зупиняємо стандартну навігацію
//     navigate(href, { state: { backgroundLocation: location } });
//   };

//   const element = menuItems.map((item: IMenuItems) => {
//     const isModal = item.type === "modal";

//     return (
//       <li key={item.id}>
//         <NavLink
//           to={item.href}
//           onClick={isModal ? (e) => handleModalClick(e, item.href) : undefined}
//           className={({ isActive }) =>
//             `${styles.link} ${isActive ? styles.active : ""}`
//           }
//         >
//           {({ isActive }) => {
//             const Icon = isActive ? item.iconActive : item.icon;
//             return (
//               <>
//                 <Icon className={styles.icon} />
//                 <p>{item.text}</p>
//               </>
//             );
//           }}
//         </NavLink>
//       </li>
//     );
//   });

//   return (
//     <ul className={styles.menu}>
//       {element}
//       <NavLink
//         to={"/api/me"}
//         className={({ isActive }) =>
//           `${styles.link} ${styles.profileContainer} ${
//             isActive ? styles.active : ""
//           }`
//         }
//       >
//         <div className={styles.avatarBorder}>
//           <img
//             src={user?.profilePhoto || defaultAvatar}
//             alt="User avatar"
//             className={styles.avatarImage}
//           />
//         </div>
//         <p className={styles.text}>Profile</p>
//       </NavLink>
//     </ul>
//   );
// };
