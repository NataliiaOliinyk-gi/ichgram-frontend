import type { FC } from "react";

import MyProfile from "../../modules/MyProfile/MyProfile";
import Wrapper from "../../shared/components/Wrapper/Wrapper";

const MyProfilePage: FC = () => {
  return (
    <main>
      <Wrapper>
        <MyProfile />
      </Wrapper>
    </main>
  );
};

export default MyProfilePage;
