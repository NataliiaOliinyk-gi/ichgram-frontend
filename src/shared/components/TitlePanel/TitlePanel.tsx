import type { FC, ReactNode } from "react";

import styles from "./TitlePanel.module.css";

interface ITitlePanelProps {
  children: ReactNode;
}

const TitlePanel: FC<ITitlePanelProps> = ({ children }) => {
  return <h3 className={styles.title}>{children}</h3>;
};

export default TitlePanel;
