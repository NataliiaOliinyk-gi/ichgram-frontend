import type { FC } from "react";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";

import LoginForm from "./LoginForm/LoginForm";

const Login: FC = () => {
  return (
    <>
      <AuthLayout>
        <AuthContentBox
          children={<LoginForm />}
          showImage
          toLink="/api/auth/forgot-password"
          linkText="Forgot password?"
        />

        <AuthFooter
          text="Don't have an account?"
          linkText="Sign up"
          toLink="/api/auth/register"
        />
      </AuthLayout>
    </>
  );
};

export default Login;
