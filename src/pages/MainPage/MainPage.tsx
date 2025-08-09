import type { FC } from "react";

import Main from "../../modules/Main/Main";
import Wrapper from "../../shared/components/Wrapper/Wrapper";

const MainPage: FC = () => {
  return (
    <main>
      <Wrapper>
        <Main />
      </Wrapper>
    </main>
  );
};

export default MainPage;
