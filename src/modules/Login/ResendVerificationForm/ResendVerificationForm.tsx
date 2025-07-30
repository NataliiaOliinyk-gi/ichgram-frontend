import type { FC } from "react";

import AuthForm from "../../../shared/components/AuthForm/AuthForm";

import type { IMyFormValues } from "../../../shared/components/AuthForm/AuthForm";

interface IResendVerificationFormProps {
  submitForm: (values: IMyFormValues) => void;
  email: string;
}

const ResendVerificationForm: FC<IResendVerificationFormProps> = ({ submitForm, email })=>{
    const onSubmitForm = (values: IMyFormValues) => {
    submitForm(values);
  };

  return (
    <AuthForm
      textBtn={"Resend Email"}
      submitForm={onSubmitForm}
      fieldsToRender={["email"]}
      email={email}
    />
  );
};

export default ResendVerificationForm;