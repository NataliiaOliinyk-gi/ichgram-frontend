import type { FC } from "react";
import { useRef, useCallback } from "react";

import Comment from "./Comment/Comment";

import type { IComment } from "../../../typescript/interfaces";

import styles from "./CommentsBox.module.css";

interface ICommentsBoxProps {
  comments: IComment[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

const CommentsBox: FC<ICommentsBoxProps> = ({
  comments,
  hasMore,
  loading,
  onLoadMore,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) onLoadMore();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  const elements = comments.map((item, index) => {
    const isLast = index === comments.length - 1;
    return (
      <Comment
        ref={isLast ? lastItemRef : undefined}
        key={item._id}
        comment={item}
      />
    );
  });

  return <ul className={styles.commentBox}>{elements}</ul>;
};

export default CommentsBox;


      // <li ref={isLast ? lastItemRef : undefined} key={item._id}>
      //   <Comment key={item._id} comment={item} />
      // </li>