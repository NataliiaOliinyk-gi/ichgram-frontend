import type { FC } from "react";
// import { Outlet } from "react-router-dom";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "../../../modules/Header/Header";
import Footer from "../../../modules/Footer/Footer";
import ModalContainer from "../../../modules/Modals/ModalContainer/ModalContainer";

import MainPage from "../../../pages/MainPage/MainPage";
import SearchPage from "../../../pages/SearchPage/SearchPage";
import ExplorePage from "../../../pages/ExplorePage/ExplorePage";
import MessagesPage from "../../../pages/MessagesPage/MessagesPage";
import NotificaitonsPage from "../../../pages/NotificaitonsPage/NotificaitonsPage";
import UserProfilePage from "../../../pages/UserProfilePage/UserProfilePage";
import MyProfilePage from "../../../pages/MyProfilePage/MyProfilePage";
import EditProfilePage from "../../../pages/EditProfilePage/EditProfilePage";
import PostPage from "../../../pages/PostPage/PostPage";
import LogoutPage from "../../../pages/LogoutPage/LogoutPage";
import NotFoundPage from "../../../pages/NotFoundPage/NotFoundPage";

// Панелі (оверлеї)
import NotificationsPanel from "../../../modules/SidePanels/NotificationsPanel/NotificationsPanel";
import SearchPanel from "../../../modules/SidePanels/SearchPanel/SearchPanel";
import NewChatPanel from "../../../modules/SidePanels/NewChatPanel/NewChatPanel";
import PostOverlay from "../../../modules/SidePanels/PostOverlay/PostOverlay";

import styles from "./PrivateLayout.module.css";

const PrivateLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { backgroundLocation?: Location } | undefined;
  const backgroundLocation = state?.backgroundLocation;

  const onClosePanel = () => navigate(-1);

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.headerContainer}>
          <Header />
          <div className={styles.mainContent}>
            {/* ГОЛОВНИЙ КОНТЕНТ */}
            <Routes location={backgroundLocation || location}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificaitonsPage />} />
              <Route path="/users/:id" element={<UserProfilePage />} />
              <Route path="/api/me" element={<MyProfilePage />} />
              <Route
                path="/api/me/edit-profile"
                element={<EditProfilePage />}
              />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route path="/api/auth/logout" element={<LogoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* МОДАЛКИ */}
            <ModalContainer />

            {/* НАКЛАДНІ ПАНЕЛІ — лише якщо є фон */}
            {backgroundLocation && (
              <>
                <div className={styles.backdrop} onClick={onClosePanel} />
                <aside className={styles.panel}>
                  <Routes>
                    <Route
                      path="/notifications"
                      element={<NotificationsPanel />}
                    />
                    <Route path="/search" element={<SearchPanel />} />
                    <Route path="/messages/new" element={<NewChatPanel />} />
                  </Routes>
                </aside>

                {/* центрований модальний шар для поста */}
                <Routes>
                  <Route
                    path="/posts/:id"
                    element={
                      <>
                        <div
                          className={styles.modalBackdrop}
                          onClick={() => navigate(-1)}
                        />
                        <div className={styles.centerModal}>
                          <PostOverlay />
                        </div>
                      </>
                    }
                  />
                </Routes>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivateLayout;

{
  /* <div className={styles.layout}>
        <div className={styles.headerContainer}>
          <Header />
          <div className={styles.mainContent}>
            <Outlet />
          </div>
          <ModalContainer />
          <SidePanels />
        </div>
        <Footer />
      </div> */
}

// універсальний закривач
// const onClosePanel = () => {
//   if (backgroundLocation) {
//     // Явно повертаємось на backgroundLocation
//     const to =
//       backgroundLocation.pathname +
//       backgroundLocation.search +
//       backgroundLocation.hash;

//     navigate(to, {
//       replace: true,
//       state: backgroundLocation,
//     });
//   } else {
//     // про всяк випадок (прямий перехід без стейту)
//     navigate("/main", { replace: true });
//   }
// };

// const onClosePanel = () => navigate(-1);

// type LocState = { backgroundLocation?: Location };
// const state = location.state as LocState | undefined;
// const baseLocation = state?.backgroundLocation || location;

{
  /* <Routes location={state?.backgroundLocation || location}></Routes>; */
}

{
  /* <Route path="/main" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificaitonsPage />} />
              <Route path="/api/users/:id" element={<UserProfilePage />} />
              <Route path="/api/me" element={<MyProfilePage />} />
              <Route
                path="/api/me/edit-profile"
                element={<EditProfilePage />}
              />

              <Route path="/api/auth/logout" element={<LogoutPage />} />
              <Route path="*" element={<NotFoundPage />} /> */
}

{
  /* Модалка поверх (тільки якщо був backgroundLocation) */
}
//  {state?.backgroundLocation && (
//         // <Routes>
//         //   <Route path="/api/me/create-post" element={<CreatePostModal />} />
//         //   {/* <Route path="/me/edit" element={<EditProfileModal />} /> */}
//         //   {/* <Route path="/post/:id/delete" element={<DeletePostModal />} /> */}
//         //   {/* додавай сюди інші модалки */}
//         // </Routes>
//       )}

// не працюючий варіант, бо роут path="*" element={<Outlet />} затирає подальші роути,
// залишаю як приклад, щоб не зробити так само
// const PrivateLayout: FC = () => {
//   const location = useLocation();
//   const state = location.state as { backgroundLocation?: Location };

//   return (
//     <>
//       <div className={styles.layout}>
//         <div className={styles.headerContainer}>
//           <Header />
//
//           {/* Маршрути: з backgroundLocation — для фону під модалкою */}
//           <div className={styles.mainContent}>
//             <Routes location={state?.backgroundLocation || location}>
//               <Route path="*" element={<Outlet />} />
//             </Routes>
//           </div>
//         </div>

//         <Footer />
//       </div>

//       {/* Модалка поверх (тільки якщо був backgroundLocation) */}
//       {state?.backgroundLocation && <ModalRoutes />}
//     </>
//   );
// };

// export default PrivateLayout;
