import type { FC } from "react";
import type { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

import styles from "./TextField.module.css";

interface IMyFormValues {
  email: string;
  password: string;
}

interface ITextFieldProps extends React.InputHTMLAttributes<HTMLElement> {
  name: string;
  register?: UseFormRegister<IMyFormValues>
  rules?: RegisterOptions
  error?: FieldError
}

// name, register, rules, error, ...props
const TextField: FC<ITextFieldProps> = ({ name, register, rules, error, ...props }) => {
  return (
    <div>
      <input
        // {...register(name, rules)}
        {...props}
        className={styles.textField}
      />
      {error && <p className={styles.textFieldError}>{error.message}</p>}
    </div>
  );
};

export default TextField;
