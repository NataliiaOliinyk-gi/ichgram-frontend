import type { FC } from "react";

import AuthForm from "../../../shared/components/AuthForm/AuthForm";
import PrivacyPolicy from "../../../shared/components/PrivacyPolicy/PrivacyPolicy";

import type { IMyFormValues } from "../../../shared/components/AuthForm/AuthForm";

const RegisterForm: FC = () => {
  const onSubmitForm = (values: IMyFormValues) => {
    console.log(values);
  };

  return (
    <AuthForm
      textBtn={"Sign up"}
      submitForm={onSubmitForm}
      fieldsToRender={["email", "fullName", "username", "password"]}
      childrenPolicy={<PrivacyPolicy/>}
    />
  );
};

export default RegisterForm;
