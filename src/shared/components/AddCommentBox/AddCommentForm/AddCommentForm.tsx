import type { FC } from "react";
import type {
  FieldError,
} from "react-hook-form";

import { useForm } from "react-hook-form";

import smileyIcon from "../../../../assets/icons/smaily.svg";

import styles from "./AddCommentForm.module.css";

export interface IAddCommentFormValues {
  text: string;
}

interface IAddCommentFormProps {
  submitForm: (values: IAddCommentFormValues) => void;
}

const AddCommentForm: FC<IAddCommentFormProps> = ({ submitForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddCommentFormValues>();

  const onSubmit = (values: IAddCommentFormValues) => {
    console.log(values);
    submitForm(values);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.addCommentBox}>
        <div>
          <img src={smileyIcon} alt="smiley icon" />
        </div>

        <input
          {...register("text", { required: "Text is required" })}
          placeholder="Add comment"
          className={styles.addComment}
        />
        {errors.text && <p>{(errors.text as FieldError).message}</p>}
      </div>
      <button type="submit" className={styles.btn}>
        Send
      </button>
    </form>
  );
};

export default AddCommentForm;
