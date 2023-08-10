import { PageContainer, RegisterPageTitle } from "./style";
import Register from "./Register";
import React from "react";

export default function RegisterPage() {
  return (
    <PageContainer>
      <RegisterPageTitle>加入會員</RegisterPageTitle>
      <Register />
    </PageContainer>
  );
}
