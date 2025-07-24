import type { FC } from "react";

import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";
import fields from "../../../shared/items/fields";

// import type { IFields } from "../../../shared/items/fields";

import styles from "./LoginForm.module.css";

const LoginForm: FC = () => {
  return (
    <form action="">
      <div className={styles.textFieldsBox}>
        <TextField
          {...fields.email}
          // register={register}
          //  error={errors.name}
        />
        <TextField
          {...fields.password}
          // register={register}
          //  error={errors.name}
        />
      </div>
      <div className={styles.btnBox}>
        <Button text={"Log in"} />
      </div>
    </form>
  );
};

export default LoginForm;
