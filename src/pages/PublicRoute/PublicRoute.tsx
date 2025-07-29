import type { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useLogin from "../../shared/hooks/useLogin";

import { selectToken } from "../../redux/auth/auth-selector";

const PublicRoute: FC = () => {
  const isLogin = useLogin();
  const token = useSelector(selectToken);

  if (!isLogin && token) return <p>Loading...</p>;

  if (isLogin) return <Navigate to="/main" />;

  return <Outlet />;
};

export default PublicRoute;
