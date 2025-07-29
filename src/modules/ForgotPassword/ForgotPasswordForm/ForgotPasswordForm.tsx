import type { FC } from "react";

import AuthForm from "../../../shared/components/AuthForm/AuthForm";

import type { IMyFormValues } from "../../../shared/components/AuthForm/AuthForm";


interface IForgotPasswordFormProps {
  submitForm: (values: IMyFormValues) => void;
}

const ForgotPasswordForm: FC<IForgotPasswordFormProps> = ({ submitForm}) => {
  const onSubmitForm = (values: IMyFormValues) => {
    submitForm(values);
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
