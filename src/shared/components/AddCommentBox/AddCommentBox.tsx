import type { FC } from "react";

import AddCommentForm from "./AddCommentForm/AddCommentForm";

import type { IAddCommentFormValues } from "./AddCommentForm/AddCommentForm";

import styles from "./AddCommentBox.module.css";

interface IAddCommentBoxProps {
  submitForm: (values: IAddCommentFormValues) => void;
}

const AddCommentBox: FC<IAddCommentBoxProps> = ({submitForm}) => {

  return (
    <div className={styles.addCommentContainer}>
      <AddCommentForm submitForm={submitForm}/>
    </div>
  );
};

export default AddCommentBox;
