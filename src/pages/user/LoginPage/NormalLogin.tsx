import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login, getMe } from "@/webAPI/user";
import { setAuthToken } from "@/utils/authToken";
import {
  LoginForm,
  LoginInput,
  LoginButton,
  LoginRefer,
  LoginReferLink,
  ErrorMessage,
  SubmitLoading
} from "./style";
import { useAuthContext, useLoadingContext } from "../../../context";

export default function NormalLogin() {
  // useTransition
  const { setUser } = useAuthContext();
  const { isLoading, setIsLoading } = useLoadingContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const history = useHistory();

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(undefined);
    try {
      const loginToken = await login({ username, password });
      if (loginToken) {
        setAuthToken(loginToken);
        const getMeRes = await getMe(loginToken);
        setUser(getMeRes.data);
        history.push("/");
      }
    } catch (error: unknown) {
      setIsLoading(false);
      const errorMessage = (error as { message?: string })?.message;
      if (typeof errorMessage === "string") {
        setErrorMessage(errorMessage);
      }
    }
  };

  const handleInputFocus = () => {
    setErrorMessage(undefined);
    setPassword("");
  };

  return (
    <>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LoginForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <LoginInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={handleInputFocus}
          placeholder='帳號'
        />
        <LoginInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={handleInputFocus}
          type='password'
          placeholder='密碼'
        />
        {isLoading ? (
          <SubmitLoading>資料驗證中...</SubmitLoading>
        ) : (
          <>
            <LoginButton>登入</LoginButton>
          </>
        )}
        <LoginRefer>
          <LoginReferLink to='#'>忘記帳號密碼？</LoginReferLink>
          <LoginReferLink to='/register'>還不是會員？加入會員</LoginReferLink>
        </LoginRefer>
      </LoginForm>
    </>
  );
}
