import type { FC } from "react";
import { Link } from "react-router-dom";

import defaultAvatar from "../../../../assets/icons/defaultAvatar.svg";

import styles from "./SearchItem.module.css";

// interface ISearchItemProps {
//   note: ISearch;
// }

const SearchItem: FC = () => {
  return (
    <li className={styles.searchBox}>
      <div className={styles.srfContainer}>
        <div className={styles.avatarBox}>
          <img
            // src={note.senderId.profilePhoto || defaultAvatar}
            src={defaultAvatar}
            alt="User avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.usersBox}>
          <Link
            to={"/main"}
            // to={`/users/${note.senderId._id}`}
            className={styles.usernameText}
          >
            <p className={styles.usernameText}>
              sashaa
              {/* {note.senderId.username} */}
            </p>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default SearchItem;
