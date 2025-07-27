import type { FC } from "react";

import Wrapper from "../../shared/components/Wrapper/Wrapper";
import AuthContainer from "../../shared/components/AuthContainer/AuthContainer";
import Login from "../../modules/Login/Login";

const LoginPage: FC = () => {
  return (
    <main>
      <Wrapper>
        <AuthContainer>
          <Login />
        </AuthContainer>
      </Wrapper>
    </main>
  );
};

export default LoginPage;
