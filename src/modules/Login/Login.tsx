import type { FC } from "react";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";

import LoginForm from "./LoginForm/LoginForm";

import styles from "./Login.module.css";

const Login: FC = () => {
  return (
    <>
        <div className={styles.imageContainer}>
          <img src="../../public/image/Background.png" alt="Background" />
        </div>

        <AuthLayout>
          <AuthContentBox
            childrenForm={<LoginForm />}
            showImage
            toLink="/api/auth/forgot-password"
            linkText="Forgot password?"
            isOrDevider
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
