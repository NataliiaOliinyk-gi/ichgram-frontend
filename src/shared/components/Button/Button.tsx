import type { FC } from "react";

import styles from "./Button.module.css";

interface IButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({
  text,
  type = "button",
  onClick,
  disabled = false,
}: IButtonProps) => {
  return (
    <button onClick={onClick} className={styles.btn} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
