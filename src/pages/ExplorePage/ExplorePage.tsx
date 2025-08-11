import type { FC } from "react";

import Explore from "../../modules/Explore/Explore";
import Wrapper from "../../shared/components/Wrapper/Wrapper";

const ExplorePage: FC = () => {
  return (
    <main>
      <Wrapper>
        <Explore />
      </Wrapper>
    </main>
  );
};

export default ExplorePage;
