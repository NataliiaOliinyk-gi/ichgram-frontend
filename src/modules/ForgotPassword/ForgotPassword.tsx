import type { FC } from "react";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import ForgotIcon from "../../shared/components/Icons/ForgotIcon";

const ForgotPassword: FC = () => {
  return (
    <>
      <AuthLayout>
        <AuthContentBox
          childrenForm={<ForgotPasswordForm />}
          icon={<ForgotIcon/>}
          textTitle="Trouble logging in?"
          textDescription="Enter your email and we'll send you a link to get back into your account."
          isOrDevider
          authLinkText="Create new account" 
          authLinkTo="/api/auth/register"
        />

        <AuthFooter linkText="Back to login" toLink="/api/auth/login" />
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
