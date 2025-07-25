import type {
  ITextFieldProps,
  IMyFormValues,
} from "../../../modules/Login/LoginForm/LoginForm";

import styles from "./TextField.module.css";

const TextField = <K extends keyof IMyFormValues>({
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

export default TextField;
