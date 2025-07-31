import type { FC, ReactNode } from "react";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import ForgotIcon from "../../shared/components/Icons/ForgotIcon";
import SuccessMessage from "../../shared/components/SuccessMessage/SuccessMessage";
import Error from "../../shared/components/Error/Error";

import { selectAuth } from "../../redux/auth/auth-selector";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { forgotPassword } from "../../redux/auth/auth-thunks";
import highlightEmail from "../../utils/highlightEmail";

import type { IForgotPasswordPayload } from "../../shared/api/auth-api";

const ForgotPassword: FC = () => {
  const [successVerify, setSuccessVerify] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<ReactNode>("");
  const { error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const submitForm = useCallback(
    async (payload: IForgotPasswordPayload) => {
      const response = await dispatch(forgotPassword(payload)).unwrap();
      setSuccessMessage(highlightEmail(response.message, payload.email));
      setSuccessVerify(true);
    },
    [dispatch]
  );

  return (
    <>
      <AuthLayout>
        {successVerify && <SuccessMessage>{successMessage}</SuccessMessage>}

        <AuthContentBox
          childrenForm={<ForgotPasswordForm submitForm={submitForm} />}
          icon={<ForgotIcon />}
          textTitle="Trouble logging in?"
          textDescription="Enter your email and we'll send you a link to get back into your account."
          isOrDevider
          authLinkText="Create new account"
          authLinkTo="/api/auth/register"
        />

        {error && <Error>{error}</Error>}

        <AuthFooter linkText="Back to login" toLink="/" />
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
