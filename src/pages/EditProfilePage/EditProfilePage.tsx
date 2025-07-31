import type { FC } from "react";

import EditProfile from "../../modules/EditProfile/EditProfile";
import Wrapper from "../../shared/components/Wrapper/Wrapper";

const EditProfilePage: FC = () => {
  return (
    <main>
      <Wrapper>
        <EditProfile />
      </Wrapper>
    </main>
  );
};

export default EditProfilePage;
