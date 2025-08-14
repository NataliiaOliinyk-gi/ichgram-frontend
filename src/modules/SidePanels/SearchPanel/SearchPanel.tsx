import type { FC } from "react";

import TitlePanel from "../../../shared/components/TitlePanel/TitlePanel";
import SearchBox from "../../../shared/components/SearchBox/SearchBox";

import styles from "./SearchPanel.module.css";

const SearchPanel: FC = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.titleBox}>
        <TitlePanel>Search</TitlePanel>
      </div>
      <SearchBox />
    </div>
  );
};

export default SearchPanel;
