import type { FC, ReactNode } from "react";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import RegisterForm from "./RegisterForm/RegisterForm";
import SuccessMessage from "../../shared/components/SuccessMessage/SuccessMessage";
import Error from "../../shared/components/Error/Error";

import { selectAuth } from "../../redux/auth/auth-selector";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { register } from "../../redux/auth/auth-thunks";

import highlightEmail from "../../utils/highlightEmail";

import type { IRegisterPayload } from "../../shared/api/auth-api";

const Register: FC = () => {
  const [successRegister, setSuccessRegister] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<ReactNode>("");
  const [registerDisabled, setRegisterDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const submitForm = useCallback(
    async (payload: IRegisterPayload) => {
      setErrorMessage("");
      try {
        const response = await dispatch(register(payload)).unwrap();
        setSuccessMessage(highlightEmail(response.message, payload.email));
        setSuccessRegister(true);
        setRegisterDisabled(true);
      } catch (error) {
        if (typeof error === "string") {
          setErrorMessage(error);
        }
      }
    },
    [dispatch]
  );

  return (
    <>
      <AuthLayout>
        {successRegister && <SuccessMessage>{successMessage}</SuccessMessage>}

        <AuthContentBox
          childrenForm={
            <RegisterForm
              submitForm={submitForm}
              disabled={registerDisabled}
              errorMessage={errorMessage}
            />
          }
          showImage
          text={
            <>
              Sign up to see photos and videos <br />
              from your friends.
            </>
          }
        />

        {error && <Error>{error}</Error>}

        <AuthFooter text="Have an account? " linkText="Log in" toLink="/" />
      </AuthLayout>
    </>
  );
};

export default Register;
