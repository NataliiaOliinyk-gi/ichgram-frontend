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
  initialFollowing?: boolean; 
  initialFollowersCount?: number; 
  variantWhenFollowing?: "primary" | "secondary" | "outline" | "hidden";
  variantWhenNotFollowing?: "primary" | "secondary" | "outline";
  textWhenFollowing?: string;
  textWhenNotFollowing?: string;
  width?: string;
}

const FollowButton: FC<IFollowButtonProps> = ({
  targetId,
  initialFollowing,
  initialFollowersCount,
  variantWhenFollowing = "secondary",     // у профілі (Unfollow)
  variantWhenNotFollowing = "primary",    // у профілі (Follow)
  textWhenFollowing = "Unfollow",
  textWhenNotFollowing = "Follow",
  width,
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

   // Якщо підписані і треба ховати кнопку
  if (isFollowing && variantWhenFollowing === "hidden") {
    return null;
  }

  const onClick = () => {
    if (isFollowing) {
      dispatch(unfollowUser({ targetId }));
    } else {
      dispatch(followUser({ targetId }));
    }
  };

  const variant = isFollowing ? variantWhenFollowing : variantWhenNotFollowing;
  const text = isFollowing ? textWhenFollowing : textWhenNotFollowing;
  console.log(text);
  console.log(isFollowing);
  console.log(item);
  
  

   if (variant === "hidden") return null;

  return (
    <div className={styles.followBtn}>
      <Button
        text={text}
        variant={variant}
        onClick={onClick}
        disabled={loading}
        width={width}
      />
    </div>
  );
};

export default FollowButton;
