import type { FC } from "react";
import type {
  FieldError,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

import { useForm } from "react-hook-form";

import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";
import fields from "../../../shared/items/fields";

import styles from "./AuthForm.module.css";

export interface IMyFormValues {
  email: string;
  password: string;
  fullName: string;
  username: string;
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
}

const AuthForm: FC<IAuthFormProps> = ({
  textBtn,
  submitForm,
  fieldsToRender,
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
    <TextField
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
      <div className={styles.btnBox}>
        <Button text={textBtn} type="submit" />
      </div>
    </form>
  );
};

export default AuthForm;
