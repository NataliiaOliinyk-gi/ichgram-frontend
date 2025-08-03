import type { FC, ReactNode } from "react";
import { useState, useEffect } from "react";
import type {
  FieldError,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

import { useForm } from "react-hook-form";

import AuthTextField from "../AuthTextField/AuthTextField";
import AuthButton from "../AuthButton/AuthButton";
import fields from "../../data/authFields";

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
  email?: string;
  disabled?: boolean;
  errorMessage?: string;
}

const AuthForm: FC<IAuthFormProps> = ({
  textBtn,
  submitForm,
  fieldsToRender,
  childrenPolicy,
  email,
  disabled,
  errorMessage,
}: IAuthFormProps) => {
  const [formValues, setFormValues] = useState<IMyFormValues | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IMyFormValues>({
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = (values: IMyFormValues) => {
    submitForm(values);
    setFormValues(values);
    reset();
  };

  useEffect(() => {
    const onSetError = () => {
      if (typeof errorMessage === "string" && formValues) {
        const match = errorMessage.match(
          /The (\w+) '(.+)' is already in use\./
        );
        if (match) {
          const [, field, value] = match;
          if (field in formValues) {
            setError(field as keyof IMyFormValues, {
              type: "manual",
              message: `${field} "${value}" is already in use.`,
            });
          }
        }
      }
    };
    onSetError();
  }, [errorMessage, setError, formValues]);

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
        <AuthButton text={textBtn} type="submit" disabled={disabled} />
      </div>
    </form>
  );
};

export default AuthForm;
