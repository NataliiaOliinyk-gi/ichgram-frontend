import type { FC, ReactNode } from "react";
import type {
  FieldError,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

import { useForm } from "react-hook-form";

import AuthTextField from "../AuthTextField/AuthTextField";
import AuthButton from "../AuthButton/AuthButton";
import fields from "../../data/fields";
// import Error from "../Error/Error";

import styles from "./AuthForm.module.css";

export interface IMyFormValues {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

export interface ITextFieldProps<K extends keyof IMyFormValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: K;
  register: UseFormRegister<IMyFormValues>;
  rules: RegisterOptions<IMyFormValues, K>;
  error: FieldError;
}

interface IAuthFormProps {
  textBtn: string;
  submitForm: (values: IMyFormValues) => void;
  fieldsToRender: (keyof IMyFormValues)[];
  childrenPolicy?: ReactNode;
}

const AuthForm: FC<IAuthFormProps> = ({
  textBtn,
  submitForm,
  fieldsToRender,
  childrenPolicy,
}: IAuthFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMyFormValues>();

  const onSubmit = (values: IMyFormValues) => {
    submitForm(values);
    reset();
  };

  const elements = fieldsToRender.map((fieldName) => (
    <AuthTextField
      key={fieldName}
      {...fields[fieldName]}
      name={fields[fieldName].name}
      register={register}
      rules={fields[fieldName].rules}
      error={errors[fieldName] as FieldError}
    />
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.textFieldsBox}>{elements}</div>
      {childrenPolicy}
      <div className={styles.btnBox}>
        <AuthButton text={textBtn} type="submit"
        //  disabled={loading} 
         />
      </div>
      {/* {error && <Error>{error}</Error>} */}
    </form>
  );
};

export default AuthForm;
