import type { FC } from "react";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import AuthLayout from "../../shared/components/AuthLayout/AuthLayout";
import AuthContentBox from "../../shared/components/AuthContentBox/AuthContentBox";
import AuthFooter from "../../shared/components/AuthFooter/AuthFooter";
import RegisterForm from "./RegisterForm/RegisterForm";
import SuccessMessage from "../../shared/components/SuccessMessage/SuccessMessage";
import Error from "../../shared/components/Error/Error";

import { selectAuth } from "../../redux/auth/auth-selector";
import { useAppDispatch } from "../../shared/hooks/hooks";
import { register } from "../../redux/auth/auth-thunks";

import type { IRegisterPayload } from "../../shared/api/auth-api";

const Register: FC = () => {
  const [successVerify, setSuccessVerify] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const submitForm = useCallback(
    async (payload: IRegisterPayload) => {
      try {
        const response = await dispatch(register(payload)).unwrap(); // отримуєш результат
        setSuccessMessage(response.message); // зберігаєш повідомлення
        setSuccessVerify(true);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
    [dispatch]
  );

  return (
    <>
      <AuthLayout>
        {successVerify && <SuccessMessage>{successMessage}</SuccessMessage>}

        <AuthContentBox
          childrenForm={<RegisterForm submitForm={submitForm} />}
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
