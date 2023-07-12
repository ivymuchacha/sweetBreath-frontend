import styled from "styled-components";
import { Link } from "react-router-dom";
import { H3, Input } from "@constants/style";

export const PageContainer = styled.div`
  * {
    box-sizing: border-box;
  }

  padding-top: 40px;
  display: grid;
  justify-content: center;
`;

export const LoginPageTitle = styled(H3)`
  margin-bottom: 30px;
  text-align: center;
`;

export const LoginForm = styled.form`
  width: 350px;
`;

export const LoginInput = styled(Input)`
  margin: 10px 0;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.h5};
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 46px;
  margin: 20px 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.mainPrimary};
  font-size: ${({ theme }) => theme.fontSize.h5};
  color: #ffffff;
  cursor: pointer;
`;

export const LoginRefer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LoginReferLink = styled(Link)`
  color: ${({ theme }) => theme.colors.neutralBlack};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralWhite};

  :hover {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBlack};
  }
`;

export const SocialLoginContainer = styled.div``;

export const SocialLoginTitle = styled(H3)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralLightGrey};
  width: 100%;
  text-align: center;
  display: block;
  justify-content: center;
  padding-top: 30px;
  margin-top: 30px;
  padding-bottom: 20px;
`;

export const SocialLoginSite = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const SiteLogo = styled.img`
  height: 60px;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.mainPrimary};
  text-align: center;
`;

export const SubmitLoading = styled.div`
  padding: 20px 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutralGrey};
  text-align: center;
`;
