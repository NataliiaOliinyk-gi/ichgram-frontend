import type { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../../modules/Header/Header";
import Footer from "../../../modules/Footer/Footer";
import ModalContainer from "../ModalContainer/ModalContainer";

import styles from "./PrivateLayout.module.css";

const PrivateLayout: FC = () => {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.headerContainer}>
          <Header />
          <div className={styles.mainContent}>
            <Outlet />
          </div>
          <ModalContainer />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivateLayout;

{/* <Routes location={state?.backgroundLocation || location}></Routes>; */}

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

// import MainPage from "../../../pages/MainPage/MainPage";
// import SearchPage from "../../../pages/SearchPage/SearchPage";
// import ExplorePage from "../../../pages/ExplorePage/ExplorePage";
// import MessagesPage from "../../../pages/MessagesPage/MessagesPage";
// import NotificaitonsPage from "../../../pages/NotificaitonsPage/NotificaitonsPage";
// import UserProfilePage from "../../../pages/UserProfilePage/UserProfilePage";
// import MyProfilePage from "../../../pages/MyProfilePage/MyProfilePage";
// import EditProfilePage from "../../../pages/EditProfilePage/EditProfilePage";
// import LogoutPage from "../../../pages/LogoutPage/LogoutPage";
// import NotFoundPage from "../../../pages/NotFoundPage/NotFoundPage";

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
