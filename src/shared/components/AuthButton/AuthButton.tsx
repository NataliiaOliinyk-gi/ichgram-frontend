import type { FC } from "react";

import styles from "./AuthButton.module.css";

interface IAuthButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const AuthButton: FC<IAuthButtonProps> = ({
  text,
  type = "button",
  onClick,
  disabled = false,
}: IAuthButtonProps) => {
  return (
    <button onClick={onClick} className={styles.btn} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default AuthButton;
