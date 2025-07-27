import type { FC } from "react";

import AuthForm from "../../../shared/components/AuthForm/AuthForm";

import type { IMyFormValues } from "../../../shared/components/AuthForm/AuthForm";

const ForgotPasswordForm: FC = () => {
  const onSubmitForm = (values: IMyFormValues) => {
    console.log(values);
  };

  return (
    <AuthForm
      textBtn={"Reset your password"}
      submitForm={onSubmitForm}
      fieldsToRender={["email"]}
    />
  );
};

export default ForgotPasswordForm;
