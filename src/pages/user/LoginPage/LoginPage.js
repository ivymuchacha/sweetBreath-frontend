import { PageContainer, LoginPageTitle } from "./style";
import NormalLogin from "./NormalLogin";
import SocialLogin from "./SocialLogin";
import React from "react";

export default function LoginPage() {
  return (
    <PageContainer>
      <LoginPageTitle>會員登入</LoginPageTitle>
      <NormalLogin />
      <SocialLogin />
    </PageContainer>
  );
}
