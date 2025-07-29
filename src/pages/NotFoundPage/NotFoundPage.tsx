import type { FC } from "react";

import NotFound from "../../modules/NotFound/NotFound";
import Wrapper from "../../shared/components/Wrapper/Wrapper";

const NotFoundPage: FC = () => {
  return (
    <main>
      <Wrapper>
        <NotFound />
      </Wrapper>
    </main>
  );
};

export default NotFoundPage;
