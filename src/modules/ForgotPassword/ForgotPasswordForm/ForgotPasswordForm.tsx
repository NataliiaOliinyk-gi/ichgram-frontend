import type { FC } from "react";

import AuthForm from "../../../shared/components/AuthForm/AuthForm";

import type { IMyFormValues } from "../../../shared/components/AuthForm/AuthForm";


interface IForgotPasswordFormProps {
  submitForm: (values: IMyFormValues) => void;
  disabled?: boolean;
}

const ForgotPasswordForm: FC<IForgotPasswordFormProps> = ({ submitForm, disabled}) => {
  const onSubmitForm = (values: IMyFormValues) => {
    submitForm(values);
  };

  return (
    <AuthForm
      textBtn={"Reset your password"}
      submitForm={onSubmitForm}
      fieldsToRender={["email"]}
      disabled={disabled}
    />
  );
};

export default ForgotPasswordForm;
