import { Routes, Route } from "react-router-dom";

import MainPage from "./MainPage/MainPage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import ForgotPasswordPage from "./ForgotPasswordPage/ForgotPasswordPage";

import SearchPage from "./SearchPage/SearchPage";
import ExplorePage from "./ExplorePage/ExplorePage";
import MessagesPage from "./MessagesPage/MessagesPage";
import NotificaitonsPage from "./NotificaitonsPage/NotificaitonsPage";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import MyProfilePage from "./MyProfilePage/MyProfilePage";
import EditProfilePage from "./EditProfilePage/EditProfilePage";

import LogoutPage from "./LogoutPage/LogoutPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

import PublicRoute from "./PublicRoute/PublicRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PrivateLayout from "../shared/components/PrivateLayout/PrivateLayout";

import LearnMorePage from "./LearnMorePage/LearnMorePage";
import TermsPage from "./TermsPage/TermsPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage/PrivacyPolicyPage";
import CookiesPolicyPage from "./CookiesPolicyPage/CookiesPolicyPage";

const Navigations = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/api/auth/register" element={<RegisterPage />} />
          <Route
            path="/api/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificaitonsPage />} />
            <Route path="/users/:id" element={<UserProfilePage />} />
            <Route path="/api/me" element={<MyProfilePage />} />
            <Route path="/api/me/edit-profile" element={<EditProfilePage />} />

            <Route path="/api/auth/logout" element={<LogoutPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Navigations;
