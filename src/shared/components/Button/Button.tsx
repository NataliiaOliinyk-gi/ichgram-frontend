import type { FC } from "react";

import styles from "./Button.module.css";

interface IButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: string;
}

const Button: FC<IButtonProps> = ({
  text,
  type = "button",
  onClick,
  disabled = false,
  variant = "default",
}: IButtonProps) => {

  const className = variant === "grey" ? styles.btnSecondary : styles.btnPrimary;

  return (
    <button onClick={onClick} 
    className={`${styles.btn} ${className}`}
    type={type} 
    disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
