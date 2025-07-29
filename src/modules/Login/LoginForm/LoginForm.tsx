import type { FC } from "react";

import AuthForm from "../../../shared/components/AuthForm/AuthForm";

import type { IMyFormValues } from "../../../shared/components/AuthForm/AuthForm";

interface ILoginFormProps {
  submitForm: (values: IMyFormValues) => void;
}

const LoginForm: FC<ILoginFormProps> = ({ submitForm }) => {
  const onSubmitForm = (values: IMyFormValues) => {
    submitForm(values);
  };

  return (
    <AuthForm
      textBtn={"Log in"}
      submitForm={onSubmitForm}
      fieldsToRender={["email", "password"]}
    />
  );
};

export default LoginForm;
