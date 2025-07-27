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
import MeProfilePage from "./MeProfilePage/MeProfilePage";
import CreatePostPage from "./CreatePostPage/CreatePostPage";

import LogoutPage from "./LogoutPage/LogoutPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

import PublicRoute from "./PublicRoute/PublicRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

import LearnMorePage from "./LearnMorePage/LearnMorePage";
import TermsPage from "./TermsPage/TermsPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage/PrivacyPolicyPage";
import CookiesPolicyPage from "./CookiesPolicyPage/CookiesPolicyPage";

const Navigations = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/api/auth/login" element={<LoginPage />} />
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
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificaitonsPage />} />
        <Route path="/api/users/:id" element={<UserProfilePage />} />
        <Route path="/api/users/me" element={<MeProfilePage />} />
        <Route path="/api/users/me/create-post" element={<CreatePostPage />} />

        <Route path="/api/auth/logout" element={<LogoutPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigations;
