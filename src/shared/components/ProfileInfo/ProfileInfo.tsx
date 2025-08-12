import type { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../Button/Button";
import FollowButton from "../FollowButton/FollowButton";

import linkSvg from "../../../assets/icons/link.svg";
import defaultAvatar from "../../../assets/icons/defaultAvatar.svg";

import { selectFollowByUserId } from "../../../redux/follows/follows-selector";

import type { IUser } from "../../../typescript/interfaces";
import type { IPost } from "../../../typescript/interfaces";

import styles from "./ProfileInfo.module.css";

interface IProfileInfoProps {
  user: IUser;
  isMe?: boolean;
  posts: IPost[];
}

const ProfileInfo: FC<IProfileInfoProps> = ({
  user,
  isMe = false,
  posts,
}: IProfileInfoProps) => {
  const followData = useSelector(selectFollowByUserId(user._id));
  const followersCount = followData?.followersCount ?? user.followersCount;

  return (
    <section className={styles.section}>
      <div className={styles.avatarBorder}>
        <img
          src={user.profilePhoto || defaultAvatar}
          alt={`${user.username}'s profile`}
          className={styles.avatarImage}
        />
      </div>

      <div className={styles.profileInfoBox}>
        <div className={styles.titleBox}>
          <p className={styles.title}>{user.username}</p>

          {isMe && (
            <Link to="/api/me/edit-profile">
              <Button text="Edit profile" variant="secondary" />
            </Link>
          )}

          {!isMe && (
            <div className={styles.buttonsBox}>
              <FollowButton
                targetId={user._id}
                initialFollowing={user.isFollowedByCurrentUser}
                initialFollowersCount={user.followersCount}
                variantWhenFollowing="secondary"
                variantWhenNotFollowing="primary"
              />
              <Button text={"Message"} variant={"secondary"} />
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div>
            <span>{posts.length}</span>
            <p>posts</p>
          </div>
          <div>
            <span>{followersCount}</span>
            <p>followers</p>
          </div>
          <div>
            <span>{user.followingCount}</span>
            <p>following</p>
          </div>
        </div>

        <div className={styles.biography}>
          <p className={styles.userFullName}>{user.fullName}</p>
          <p className={styles.biographyText}>{user.biography}</p>
        </div>

        {user.website && (
          <div className={styles.link}>
            <img src={linkSvg} alt="Link icon" />
            <a href={user.website} target="_blank">
              {user.website}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileInfo;
