import type {
  IEditProfileFormValues,
  ITextFieldEditProps,
} from "../../../modules/EditProfile/EditProfileForm/EditProfileForm";

import styles from "./TextField.module.css";

interface ExtendedProps {
  valueLength?: number;
  maxLength?: number;
  isTextarea?: boolean;
  isLink?: boolean;
}

const TextField = <K extends keyof IEditProfileFormValues>({
  name,
  label,
  register,
  rules,
  error,
  valueLength,
  maxLength,
  isTextarea,
  isLink,
  ...props
}: ITextFieldEditProps<K> & ExtendedProps) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      {isTextarea ? (
        <textarea
          {...register(name, rules)}
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
          maxLength={maxLength}
          className={`${styles.textField} ${styles.textarea}`}
        />
      ) : isLink ? (
        <input
          {...register(name, rules)}
          {...props}
          className={`${styles.textField} ${styles.link}`}
        />
      ) : (
        <input
          {...register(name, rules)}
          {...props}
          className={styles.textField}
        />
      )}

      {maxLength !== undefined && (
        <div className={styles.counter}>
          {valueLength || 0} / {maxLength}
        </div>
      )}

      {error && <p className={styles.textFieldError}>{error.message}</p>}
    </div>
  );
};

export default TextField;


      {/* <input
        {...register(name, rules)}
        {...props}
        className={styles.textField}
      /> */}

// const inputClass = [
//   styles.textField,
//   isLink ? styles["textField--link"] : "",
//   isTextarea ? styles["textField--textarea"] : "",
// ].join(" ");

// const inputProps = {
//   ...register(name, rules),
//   ...props,
//   className: inputClass,
//   id: name,
//   maxLength,
// };

//  {isTextarea ? (
//         <textarea {...(inputProps)} rows={4} />
//       ) : (
//         <input type="text" {...inputProps} />
//       )}

//       {maxLength !== undefined && (
//         <div className={styles.counter}>
//           {valueLength || 0} / {maxLength}
//         </div>
//       )}
