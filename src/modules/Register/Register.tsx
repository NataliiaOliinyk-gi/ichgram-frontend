import type { FC } from "react";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import RegisterForm from "./RegisterForm/RegisterForm";

const Register: FC = () => {
  return (
    <>
      <AuthLayout>
        <AuthContentBox
          childrenForm={<RegisterForm />}
          showImage
          text={
            <>
              Sign up to see photos and videos <br />
              from your friends.
            </>
          }
        />

        <AuthFooter
          text="Have an account? "
          linkText="Log in"
          toLink="/api/auth/login"
        />
      </AuthLayout>
    </>
  );
};

export default Register;
