import type { FC } from "react";

import TitlePanel from "../../../shared/components/TitlePanel/TitlePanel";
import SearchItem from "./SearchItem/SearchItem";
import ClearIcon from "../../../assets/icons/clearIcon.svg";

import styles from "./SearchPanel.module.css";

const SearchPanel: FC = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.titleBox}>
        <TitlePanel>Search</TitlePanel>
      </div>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
        <div className={styles.imgBox}>
          <img src={ClearIcon} alt="ClearIcon" />
        </div>
      </div>
      <div className={styles.contentBox}>
        <p className={styles.title}>Recent</p>
      </div>
      <ul className={styles.searchContainer}>
        {/* {elements} */}
        <SearchItem />
      </ul>
      {/* {loading && <Loader loading={loading} />} */}
      {/* {error && <Error>{error}</Error>} */}
    </div>
  );
};

export default SearchPanel;
