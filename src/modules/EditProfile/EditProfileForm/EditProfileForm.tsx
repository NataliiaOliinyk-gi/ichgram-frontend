import type { FC } from "react";
import { useEffect } from "react";
import type {
  FieldError,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";
import type { IUser } from "../../../typescript/interfaces";

import { useForm } from "react-hook-form";

import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";
import editProfileFields from "../../../shared/data/editProfileFields";

import styles from "./EditProfileForm.module.css";

export interface IEditProfileFormValues {
  username: string;
  fullName: string;
  website?: string;
  biography?: string;
}

export interface ITextFieldEditProps<K extends keyof IEditProfileFormValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: K;
  label: string;
  register: UseFormRegister<IEditProfileFormValues>;
  rules: RegisterOptions<IEditProfileFormValues, K>;
  error: FieldError;
}

interface IEditProfileFormProps {
  textBtn: string;
  submitForm: (values: IEditProfileFormValues) => void;
  fieldsToRender: (keyof IEditProfileFormValues)[];
  user: IUser;
  disabled?: boolean;
  errorMessage?: string;
  // onFieldError?: (field: keyof IEditProfileFormValues, message: string) => void;
}

const EditProfileForm: FC<IEditProfileFormProps> = ({
  textBtn,
  submitForm,
  fieldsToRender,
  user,
  disabled,
  errorMessage,
}: // onFieldError,
IEditProfileFormProps) => {
  // const [formValues, setFormValues] = useState<IEditProfileFormValues | null>(
  //   null
  // );

  const {
    register,
    handleSubmit,
    setError,
    // reset,
    watch,
    formState: { errors },
  } = useForm<IEditProfileFormValues>({
    defaultValues: {
      username: user.username,
      fullName: user.fullName,
      website: user.website,
      biography: user.biography,
    },
  });

  // Стежимо за біографією
  const biographyValue = watch("biography");

  const onSubmit = (values: IEditProfileFormValues) => {
    submitForm(values);
    // setFormValues(values);
  };

  useEffect(() => {
    if (typeof errorMessage === "string") {
      const match = errorMessage.match(/The (\w+) '(.+)' is already in use\./);
      if (match) {
        const [, field, value] = match;
        const fieldName = field as keyof IEditProfileFormValues;

        setError(fieldName, {
          type: "manual",
          message: `${field} "${value}" is already in use.`,
        });

        // onFieldError?.(fieldName, `${field} "${value}" is already in use.`);
      }
    }
  }, [errorMessage, setError]);

  const elements = fieldsToRender.map((fieldName) => {
    const isBiography = fieldName === "biography";
    const isWebsite = fieldName === "website";

    return (
      <TextField
        key={fieldName}
        {...editProfileFields[fieldName]}
        name={editProfileFields[fieldName].name}
        label={editProfileFields[fieldName].label}
        register={register}
        rules={editProfileFields[fieldName].rules}
        error={errors[fieldName] as FieldError}
        isTextarea={isBiography}
        isLink={isWebsite}
        valueLength={isBiography ? biographyValue?.length || 0 : undefined}
        maxLength={isBiography ? 150 : undefined}
      />
    );
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.textFieldsBox}>{elements}</div>

      <div className={styles.btnBox}>
        <Button text={textBtn} type="submit" disabled={disabled} width="100%" />
      </div>
    </form>
  );
};

export default EditProfileForm;

// useEffect(() => {
//   const onSetError = () => {
//   if (typeof errorMessage === "string" && formValues) {
//     const match = errorMessage.match(/The (\w+) '(.+)' is already in use\./);
//     if (match) {
//       const [, field, value] = match;
//       if (field in formValues) {
//         setError(field as keyof IEditProfileFormValues, {
//           type: "manual",
//           message: `${field} "${value}" is already in use.`,
//         });
//       }
//     }
//   }
//   };
//   onSetError();
// }, [errorMessage, setError, formValues]);

// const elements = fieldsToRender.map((fieldName) => {
//   const isBiography = fieldName === "biography";
//   const isWebsite = fieldName === "website";

//   return (
//     <TextField
//       key={fieldName}
//       {...editProfileFields[fieldName]}
//       name={editProfileFields[fieldName].name}
//       label={editProfileFields[fieldName].label}
//       register={register}
//       rules={editProfileFields[fieldName].rules}
//       error={errors[fieldName] as FieldError}
//       isTextarea={isBiography}
//       valueLength={isBiography ? biographyValue?.length || 0 : undefined}
//       maxLength={isBiography ? 150 : undefined}
//       isLink={isWebsite}
//     />
//   );
// });

//  звичайний TextField до зміни різних інпутів

// const elements = fieldsToRender.map((fieldName) => (
//   <TextField
//     key={fieldName}
//     {...editProfileFields[fieldName]}
//     name={editProfileFields[fieldName].name}
//     label={editProfileFields[fieldName].label}
//     register={register}
//     rules={editProfileFields[fieldName].rules}
//     error={errors[fieldName] as FieldError}
//   />
// ));
