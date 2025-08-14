import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

import defaultAvatar from "../../../../assets/icons/defaultAvatar.svg";

import type { IUser } from "../../../../typescript/interfaces";

import styles from "./SearchItem.module.css";

interface ISearchItemProps {
  user: IUser;
  onUserClick?: (user: IUser) => void;
}

const SearchItem = forwardRef<HTMLLIElement, ISearchItemProps>(
  ({ user, onUserClick }, ref: ForwardedRef<HTMLLIElement>) => {
    return (
      <li className={styles.searchBox} ref={ref}>
        <div className={styles.srfContainer}>
          <div className={styles.avatarBox}>
            <img
              src={user.profilePhoto || defaultAvatar}
              alt="User avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.usersBox}>
            {onUserClick ? (
          <button
            type="button"
            className={styles.rowBtn}
            onClick={() => onUserClick(user)}
          >
            {user.username}
          </button>
        ) : (
          <Link to={`/users/${user._id}`} className={styles.usernameText}>
            {user.username}
          </Link>
           )}
            <p className={styles.fullNameText}>{user.fullName}</p>
          </div>
        </div>
      </li>
    );
  }
);

export default SearchItem;

