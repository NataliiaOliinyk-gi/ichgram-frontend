import type { FC } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { openViewPostModal } from "../../../redux/modal/modal-slise";

import type { IPost } from "../../../typescript/interfaces";

import styles from "./PostsInProfile.module.css";

interface IPostsInProfileProps {
  posts: IPost[];
}

const PostsInProfile: FC<IPostsInProfileProps> = ({
  posts = [],
}: IPostsInProfileProps) => {
  const dispatch = useAppDispatch();

  const handleClick = (post: IPost) => {
    dispatch(openViewPostModal(post));
  };

  const elements = posts
    // .sort((a, b) => {
    //   const dateA = new Date(a.createdAt ?? 0).getTime();
    //   const dateB = new Date(b.createdAt ?? 0).getTime();
    //   return dateB - dateA;
    // })
    .map((item) => (
      <div
        key={item._id}
        className={styles.imageContainer}
        onClick={() => handleClick(item)}
      >
        <img src={item.photo} alt="photo" className={styles.image} />
      </div>
    ));

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.postsContainer}>{elements}</div>
    </section>
  );
};

export default PostsInProfile;
