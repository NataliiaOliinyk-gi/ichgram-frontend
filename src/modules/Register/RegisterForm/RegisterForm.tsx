import type { FC } from "react";

import AuthForm from "../../../shared/components/AuthForm/AuthForm";
import PrivacyPolicy from "../../../shared/components/PrivacyPolicy/PrivacyPolicy";

import type { IMyFormValues } from "../../../shared/components/AuthForm/AuthForm";

interface IRegisterProps {
  submitForm: (values: IMyFormValues) => void;
  disabled: boolean;
  errorMessage?: string;
}

const RegisterForm: FC<IRegisterProps> = ({ submitForm, disabled, errorMessage }) => {
  const onSubmitForm = (values: IMyFormValues) => {
    submitForm(values);
  };

  return (
    <AuthForm
      textBtn={"Sign up"}
      submitForm={onSubmitForm}
      fieldsToRender={["email", "fullName", "username", "password"]}
      childrenPolicy={<PrivacyPolicy />}
      disabled={disabled}
      errorMessage={errorMessage}
    />
  );
};

export default RegisterForm;
