import type { FC } from "react";

import Wrapper from "../../shared/components/Wrapper/Wrapper";
import AuthContainer from "../../shared/components/AuthContainer/AuthContainer";
import Register from "../../modules/Register/Register";

const RegisterPage: FC = () => {
  return (
    <main>
      <Wrapper>
        <AuthContainer>
          <Register />
        </AuthContainer>
      </Wrapper>
    </main>
  );
};

export default RegisterPage;
