import type { FC } from "react";

import Wrapper from "../../shared/components/Wrapper/Wrapper";
import AuthContainer from "../../shared/components/AuthContainer/AuthContainer";
import ForgotPassword from "../../modules/ForgotPassword/ForgotPassword";

const ForgotPasswordPage: FC = () => {
  return (
    <main>
      <Wrapper>
        <AuthContainer>
          <ForgotPassword />
        </AuthContainer>
      </Wrapper>
    </main>
  );
};

export default ForgotPasswordPage;
