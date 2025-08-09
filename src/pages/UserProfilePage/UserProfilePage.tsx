import type { FC } from "react";

import Wrapper from "../../shared/components/Wrapper/Wrapper";
import UserProfile from "../../modules/UserProfile/UserProfile";

const UserProfilePage: FC = () => {
  return (
    <main>
      <Wrapper>
        <UserProfile />
      </Wrapper>
    </main>
  );
};

export default UserProfilePage;
