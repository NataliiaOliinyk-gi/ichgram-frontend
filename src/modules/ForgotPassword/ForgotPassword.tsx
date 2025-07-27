import type { FC } from "react";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";

const ForgotPassword: FC = () => {
  return (
    <>
      <AuthLayout>
        <AuthContentBox
          childrenForm={<ForgotPasswordForm />}
          showImage
          textTitle={
            <>
              Enter your email, phone, or username and we'll send you a link to
              get back into your account.
            </>
          }
        />

        <AuthFooter 
            linkText="Back to login" 
            toLink="/api/auth/login" 
        />
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
