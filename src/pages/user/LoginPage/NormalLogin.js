import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login, getMe } from "@webAPI/userAPI";
import { setAuthToken } from "@utils/authToken";
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
  const { setUser } = useAuthContext();
  const { isLoading, setIsLoading } = useLoadingContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        setIsLoading(false);
        setUsername("");
        setPassword("");
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setIsLoading(false);
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }

        setUser(response.data);
        history.push("/");
      });
    });
  };

  const handleInputFocus = () => {
    setErrorMessage(null);
    setPassword("");
  };

  return (
    <>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LoginForm onSubmit={handleSubmit}>
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
