import type { FC } from "react";

import styles from "./Button.module.css";

interface IButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({text}: IButtonProps)=>{
    return (
        <button className={styles.btn}>{text}</button>
    )
};

export default Button;