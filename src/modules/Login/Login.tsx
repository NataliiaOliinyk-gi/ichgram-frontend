import type { FC } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import Error from "../../shared/components/Error/Error";
import SuccessMessage from "../../shared/components/SuccessMessage/SuccessMessage";

import LoginForm from "./LoginForm/LoginForm";

import { selectAuth } from "../../redux/auth/auth-selector";
import { useAppDispatch } from "../../shared/hooks/hooks";
import { login, verify } from "../../redux/auth/auth-thunks";

import type { ILoginPayload } from "../../shared/api/auth-api";

import styles from "./Login.module.css";

const Login: FC = () => {
  const [searchParams, setSearcParams] = useSearchParams();
  const [successVerify, setSuccessVerify] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorVerify, setErrorVerify] = useState<string | null>(null);
  const { error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const verificationCode = searchParams.get("verificationCode");

  useEffect(() => {
    if (verificationCode) {
      const fetchVerify = async () => {
        try {
          const response = await dispatch(verify({ code: verificationCode })).unwrap();
          setSuccessMessage(response.message);
          setSuccessVerify(true);
          setSearcParams();
        } catch (error) {
          setErrorVerify((error as { message: string }).message);
        }
      };
      fetchVerify();
    }
  }, [verificationCode, dispatch, setSearcParams]);

  const submitForm = (payload: ILoginPayload) => dispatch(login(payload));

  return (
    <>
      <div className={styles.imageContainer}>
        <img src="../../public/image/Background.png" alt="Background" />
      </div>

      <AuthLayout>
        {successVerify && <SuccessMessage>{successMessage}</SuccessMessage>}

        <AuthContentBox
          childrenForm={
            <LoginForm
              submitForm={submitForm}
            />
          }
          showImage
          toLink="/api/auth/forgot-password"
          linkText="Forgot password?"
          isOrDevider
        />

        {errorVerify && <Error>{errorVerify}</Error>}
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
