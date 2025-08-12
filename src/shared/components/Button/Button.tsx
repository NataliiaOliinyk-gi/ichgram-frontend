import type { FC } from "react";

import styles from "./Button.module.css";

interface IButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  width?: string;
}

const Button: FC<IButtonProps> = ({
  text,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  width = "auto",
}: IButtonProps) => {
  const variantClass =
    {
      primary: styles.btnPrimary,
      secondary: styles.btnSecondary,
      outline: styles.btnOutline,
    }[variant] || styles.btnPrimary;

  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${variantClass}`}
      type={type}
      disabled={disabled}
      style={{ width: `${width}` }}
    >
      {text}
    </button>
  );
};

export default Button;
