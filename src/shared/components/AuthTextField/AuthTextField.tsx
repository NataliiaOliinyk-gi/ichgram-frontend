import type { ITextFieldProps, IMyFormValues } from "../AuthForm/AuthForm";

import styles from "./AuthTextField.module.css";

const AuthTextField = <K extends keyof IMyFormValues>({
  name,
  register,
  rules,
  error,
  ...props
}: ITextFieldProps<K>) => {
  return (
    <div>
      <input
        {...register(name, rules)}
        {...props}
        className={styles.textField}
      />
      {error && <p className={styles.textFieldError}>{error.message}</p>}
    </div>
  );
};

export default AuthTextField;
