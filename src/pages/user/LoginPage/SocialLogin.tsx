import {
  SocialLoginContainer,
  SocialLoginTitle,
  SocialLoginSite,
  SiteLogo
} from "./style";
import googleLogin from "@components/icon/googleLogin.png";
import facebookLogin from "@components/icon/facebookLogin.png";
import React from "react";

export default function SocialLogin() {
  return (
    <SocialLoginContainer>
      <SocialLoginTitle>社群登入</SocialLoginTitle>
      <SocialLoginSite>
        <SiteLogo
          src={googleLogin}
          style={{
            filter: "grayscale(90%)",
            cursor: "not-allowed"
          }}
        />
        <SiteLogo
          src={facebookLogin}
          style={{
            filter: "grayscale(90%)",
            cursor: "not-allowed"
          }}
        />
      </SocialLoginSite>
    </SocialLoginContainer>
  );
}
