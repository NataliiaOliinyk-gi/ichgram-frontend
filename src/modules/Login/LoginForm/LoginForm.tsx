import type { FC } from "react";

import AuthForm from "../../../shared/components/AuthForm/AuthForm";

import type { IMyFormValues } from "../../../shared/components/AuthForm/AuthForm";

const LoginForm: FC = () => {
  const onSubmitForm = (values: IMyFormValues) => {
    console.log(values);
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
