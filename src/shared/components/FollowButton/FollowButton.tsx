import type { FC } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "../Button/Button";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { selectFollowByUserId } from "../../../redux/follows/follows-selector";
import {
  followUser,
  unfollowUser,
} from "../../../redux/follows/follows-thunks";
import { seedUserFollowState } from "../../../redux/follows/follows-slise";

import styles from "./FollowButton.module.css";

interface IFollowButtonProps {
  targetId: string;
  initialFollowing?: boolean; // якщо є з бекенду  ??? isFollowing
  initialFollowersCount?: number; //  з бекенду - на профілі followersCount
  variant?: "primary" | "grey" | "link";
  size?: "sm" | "md";
}

const FollowButton: FC<IFollowButtonProps> = ({
  targetId,
  initialFollowing,
  initialFollowersCount,
//   variant = "default",
  //   size = "md",
}) => {
  const dispatch = useAppDispatch();
  const item = useSelector(selectFollowByUserId(targetId));

  //   одноразовий "засів", якщо у slice нема запису
  useEffect(() => {
    if (!item) {
      dispatch(
        seedUserFollowState({
          userId: targetId,
          isFollowedByCurrentUser: initialFollowing ?? false,
          followersCount: initialFollowersCount ?? 0,
        })
      );
    }
  }, [item, targetId, initialFollowing, initialFollowersCount, dispatch]);

  const isFollowing = item?.isFollowing ?? initialFollowing ?? false;
  const loading = item?.loading ?? false;

  const onClick = () => {
    if (isFollowing) {
      dispatch(unfollowUser({ targetId }));
    } else {
      dispatch(followUser({ targetId }));
    }
  };

  return (
    <div className={styles.followBtn}>
      <Button
        text={isFollowing ? "Unfollow" : "Follow"}
        variant={isFollowing ? "grey" : "default"}
        // variant={variant}
        // size={size}
        onClick={onClick}
        disabled={loading}
      />
    </div>
  );
};

export default FollowButton;
