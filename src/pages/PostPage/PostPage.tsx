import type { FC } from "react";

import Wrapper from "../../shared/components/Wrapper/Wrapper";
import Post from "../../modules/Post/Post";

const PostPage: FC = () => {
  return (
    <main>
      <Wrapper>
        <Post />
      </Wrapper>
    </main>
  );
};

export default PostPage;
