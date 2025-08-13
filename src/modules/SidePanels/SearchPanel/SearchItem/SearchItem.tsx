import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

import defaultAvatar from "../../../../assets/icons/defaultAvatar.svg";

import type { IUser } from "../../../../typescript/interfaces";

import styles from "./SearchItem.module.css";

interface ISearchItemProps {
  user: IUser;
}

const SearchItem = forwardRef<HTMLLIElement, ISearchItemProps>(
  ({ user }, ref: ForwardedRef<HTMLLIElement>) => {
    return (
      <li className={styles.searchBox} ref={ref}>
        <div className={styles.srfContainer}>
          <div className={styles.avatarBox}>
            <img
              src={user.profilePhoto || defaultAvatar}
              // src={defaultAvatar}
              alt="User avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.usersBox}>
            <Link
              // to={"/main"}
              to={`/users/${user._id}`}
              className={styles.usernameText}
            >
              <p className={styles.usernameText}>
                {/* sashaa */}
                {user.username}
              </p>
            </Link>
            <p className={styles.fullNameText}>{user.fullName}</p>
          </div>
        </div>
      </li>
    );
  }
);

export default SearchItem;
