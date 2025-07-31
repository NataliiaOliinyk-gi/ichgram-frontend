import type { FC, ReactNode } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import Error from "../../shared/components/Error/Error";
import SuccessMessage from "../../shared/components/SuccessMessage/SuccessMessage";

import LoginForm from "./LoginForm/LoginForm";
import ResendVerificationForm from "./ResendVerificationForm/ResendVerificationForm";

import { selectAuth } from "../../redux/auth/auth-selector";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import {
  login,
  verify,
  resendVerificationEmail,
} from "../../redux/auth/auth-thunks";
import highlightEmail from "../../utils/highlightEmail";

import type {
  ILoginPayload,
  IResendVerificationEmaiPayload,
} from "../../shared/api/auth-api";

import styles from "./Login.module.css";

const Login: FC = () => {
  // Verify Email
  const [searchParams, setSearcParams] = useSearchParams();
  const [successVerify, setSuccessVerify] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<ReactNode>("");
  // resend verify Email
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [successResendEmail, setSuccessResendEmail] = useState<boolean>(false);
  const [loginDisabled, setLoginDisabled] = useState<boolean>(false);

  const { error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const verificationCode = searchParams.get("verificationCode");

  // Verify Email
  useEffect(() => {
    if (verificationCode) {
      const fetchVerify = async () => {
        const response = await dispatch(
          verify({ code: verificationCode })
        ).unwrap();
        setSuccessMessage(response.message);
        setSuccessVerify(true);
        setSearcParams();
      };
      fetchVerify();
    }
  }, [verificationCode, dispatch, setSearcParams]);

  // Login
  const submitForm = async (payload: ILoginPayload) => {
    try {
      await dispatch(login(payload)).unwrap();
    } catch (error) {
      if (error === "Email not verified") {
        setEmailNotVerified(true);
        setUnverifiedEmail(payload.email);
      }
    }
  };

  // resend verify Email
  const submitFormResendVerification = async (
    values: IResendVerificationEmaiPayload
  ) => {
    const response = await dispatch(
      resendVerificationEmail({ email: values.email })
    ).unwrap();
    setSuccessMessage(highlightEmail(response.message, values.email));
    setSuccessResendEmail(true);
    setEmailNotVerified(false);
    setLoginDisabled(true);
  };

  return (
    <>
      <div className={styles.imageContainer}>
        <img src="../../public/image/Background.png" alt="Background" />
      </div>

      <AuthLayout>
        {successVerify && <SuccessMessage>{successMessage}</SuccessMessage>}
        {successResendEmail && (
          <SuccessMessage>{successMessage}</SuccessMessage>
        )}

        <AuthContentBox
          childrenForm={
            emailNotVerified ? (
              <ResendVerificationForm
                email={unverifiedEmail}
                submitForm={submitFormResendVerification}
              />
            ) : (
              <LoginForm submitForm={submitForm} disabled={loginDisabled} />
            )
          }
          showImage
          toLink="/api/auth/forgot-password"
          linkText="Forgot password?"
          isOrDevider
          {...(emailNotVerified && {
            textTitle: "Your email is not verified.",
            textDescription: (
              <>
                Would you like to resend the confirmation email to{" "}
                <strong>{unverifiedEmail}</strong>?
              </>
            ),
          })}
        />

        {error && <Error>{error}</Error>}

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
